const router = require('express').Router();

const Inspection = require('../entities/models').Inspection;
const Spaceship = require('../entities/models').Spaceship;
const Passenger = require('../entities/models').Passenger;

const moment = require('moment');

const errorObject = require('./baseRouting').errorObject;
const okObject = require('./baseRouting').okObject;
const responseWithQuery = require('./baseRouting').responseWithQuery;


router.get('/', (req, res) => {
    Inspection.find(responseWithQuery(res));
});

router.get('/:id', (req, res) => {
    const reqId = req.params.id;

    Inspection.findOne({ id: reqId }, responseWithQuery(res));
});

router.post('/', (req, res) => {
    const spaceshipId = req.body.spaceshipId;
    const passengersIds = req.body.passengersIds;
    const date = req.body.date;

    if (!spaceshipId) {
        errorObject.error = "Falta el parámetro spaceshipId";
        return res.status(400).json(errorObject);
    }

    if (!passengersIds) {
        errorObject.error = "Falta el parámetro passengersIds";
        return res.status(400).json(errorObject);
    }

    if (!date) {
        errorObject.error = "Falta el parámetro date";
        return res.status(400).json(errorObject);
    }


    const inspectionData = {
        id: req.body.id,
        inspector: req.body.inspector,
        spaceship_id: spaceshipId,
        passengers_ids: passengersIds,
        date: date
    }

    Inspection.findOne({ id: req.body.id })
        // Check inspection exists
        .then(async inspection => {
            if (inspection !== null) {
                throw new ParamError("Error al crear la inspección: Ya existe una inspección con el id especificado");
            }
        }).then(() => {
            return Promise.all([
                Spaceship.find({ id: spaceshipId }),
                Passenger.find({})
                    .select('id')
                    .where('id')
                    .in(passengersIds)
                    .exec()
            ])
        // check spaceship and passengers are correct and validate model
        }).then(async ([spaceships, passengers]) => {
            if (!spaceships) {
                throw new ParamError("La nave especificada no existe");
            }

            const dbPassengers = passengers.map(p => p.id)

            if (dbPassengers.length != passengersIds.length) {
                const inexistents = []
                
                passengersIds.forEach(id => {
                    if (!dbPassengers.includes(id)) {
                        inexistents.push(id);
                    }
                });

                throw new ParamError("Algunos pasajeros especificados no existen: " + inexistents)
            }

            const inspection = new Inspection(inspectionData);

            const validationError = inspection.validateSync();

            if (validationError) {
                throw validationError;
            }
        })
        // check date
        .then(() => Inspection.find({ spaceship_id: spaceshipId }).select('date'))
        .then(async inspections => {
            for (let inspection of inspections) {
                const momentDate = moment(inspection.date);
                const now = moment();

                if (momentDate.isSame(now, 'day')) {
                    throw new ParamError("Solo se puede realizar una inspección por día en cada nave")
                }
            }
        })
        // finally, create inspection if everything went ok
        .then(() => Inspection.create(inspectionData))
        .then(async inspection => {
            okObject.result = inspection;
            return res.json(okObject);
        })
        .catch(error => {
            let message;
            if (error instanceof ParamError) {
                message = "No se puede crear la inspección: " + error.message;
            } else {
                message = "Error al crear la inspección: Ha habido un error en la base de datos";
            }

            console.error(error);
            errorObject.error = message;
            return res.status(error instanceof ParamError ? 400 : 500).json(errorObject);
        })
});


class ParamError extends Error {

}


module.exports = router;