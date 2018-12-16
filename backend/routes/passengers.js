const router = require('express').Router();

const Passenger = require('../entities/models').Passenger;
const Spaceship = require('../entities/models').Spaceship;

const errorObject = require('./baseRouting').errorObject;
const okObject = require('./baseRouting').okObject;
const responseWithQuery = require('./baseRouting').responseWithQuery;


router.get('/', (req, res) => {
    Passenger.find(responseWithQuery(res));
});

router.get('/:id', (req, res) => {
    const reqId = req.params.id;

    Passenger.findOne({ id: reqId }, responseWithQuery(res));
});

router.post('/', (req, res) => {
    const passenger = new Passenger(req.body);

    const validationError = passenger.validateSync();

    if (validationError) {
        errorObject.error = "Parámetros incorrectos";
        return res.status(400).json(errorObject);
    }

    Passenger.create(passenger, responseWithQuery(res));
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
            errorObject.error = error.message;
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
            errorObject.error = error.message;
            return res.status(error instanceof ParamError ? 400 : 500).json(errorObject);
        });
});

class ParamError extends Error {

}

module.exports = router;