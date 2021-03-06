const router = require('express').Router();

const Passenger = require('../entities/models').Passenger;
const Spaceship = require('../entities/models').Spaceship;

const errorObject = require('./baseRouting').errorObject;
const okObject = require('./baseRouting').okObject;
const responseWithQuery = require('./baseRouting').responseWithQuery;


router.get('/', (req, res) => {
    Passenger.find()
    .populate('spaceship')
    .exec(responseWithQuery(res));
});

router.get('/:id', (req, res) => {
    const reqId = req.params.id;

    Passenger.findOne({ id: reqId })
    .populate('spaceship')
    .exec(responseWithQuery(res));
});

router.post('/', (req, res) => {
    const passenger = new Passenger(req.body);

    const validationError = passenger.validateSync();

    if (validationError) {
        errorObject.error = "Error al crear pasajero: Revise los parámetros de entrada";
        return res.status(400).json(errorObject);
    }

    Passenger.create(passenger)
        .then(passenger => {
            okObject.result = passenger;
            res.json(okObject);
        }).catch(error => {
            errorObject.error = "Error al crear el pasajero: Ya existe un pasajero con esa id";
            res.status(400).json(errorObject);
        });
});

router.post('/:id/board', (req, res) => {
    const spaceshipId = req.body.spaceshipId;

    if (!spaceshipId) {
        errorObject.error = "Falta el parámetro \"spaceshipId\"";
        return res.status(400).json(errorObject);
    }

    Promise.all([
        Passenger.findOne({ id: req.params.id }),
        Passenger.find({ spaceship_id: spaceshipId }),
        Spaceship.findOne({ id: spaceshipId }, 'maxPassengers')
    ])
        .then(([passenger, passengers, spaceship]) => {
            if (passenger.spaceship_id != null) {
                throw new ParamError("El pasajero seleccionado ya está subido a una nave")
            }

            if (passengers.length >= spaceship.maxPassengers) {
                throw new ParamError(`La nave con id ${spaceshipId} ha alcanzado su capacidad máxima`);
            }

            return Passenger.findOneAndUpdate({ id: req.params.id }, { $set: { spaceship_id: spaceshipId } });
        }).then(() => {
            okObject.result = null;
            return res.json(okObject);
        }).catch((error) => {
            const message = error instanceof ParamError ? "Error al asignar al pasajero: " + error.message : "Error al asignar al pasajero: Error en la base de datos";
            errorObject.error = message;
            return res.status(error instanceof ParamError ? 400 : 500).json(errorObject);
        });
});

router.post('/:id/land', (req, res) => {
    const spaceshipId = req.body.spaceshipId;

    if (!spaceshipId) {
        errorObject.error = "Falta el parámetro \"spaceshipId\"";
        return res.status(400).json(errorObject);
    }

    Passenger.findOne({ id: req.params.id })
        .then(passenger => {
            if (!passenger) {
                throw new ParamError("El pasajero seleccionado no existe");
            }

            if (passenger.spaceship_id == null) {
                throw new ParamError("El pasajero seleccionado no está a bordo de ninguna nave");
            }

            if (passenger.spaceship_id != spaceshipId) {
                throw new ParamError("El pasajero indicado no está subido a la nave indicada");
            }

            return Passenger.findOneAndUpdate({ id: req.params.id }, { $set: { spaceship_id: null }})
        }).then(() => {
            okObject.result = null;
            return res.json(okObject);
        })
        .catch(error => {
            const message = error instanceof ParamError ? "Error al bajar al pasajero: " + error.message : "Error al bajar al pasajero: Error en la base de datos";
            errorObject.error = message;
            return res.status(error instanceof ParamError ? 400 : 500).json(errorObject);
        });
});

class ParamError extends Error {

}

module.exports = router;