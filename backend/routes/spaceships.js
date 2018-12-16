const router = require('express').Router();

const Promise = require('mongoose').Promise;

const Spaceship = require('../entities/models').Spaceship;
const Passenger = require('../entities/models').Passenger;
const Inspection = require('../entities/models').Inspection;

const errorObject = require('./baseRouting').errorObject;
const okObject = require('./baseRouting').okObject;
const responseWithQuery = require('./baseRouting').responseWithQuery;

const moment = require('moment');

router.get('/', (req, res) => {
    Spaceship.find(responseWithQuery(res));
});

router.get('/:id', (req, res) => {
    const reqId = req.params.id;

    Spaceship.findOne({ id: reqId }, responseWithQuery(res));
});

router.post('/', (req, res) => {
    const spaceship = new Spaceship(req.body);

    const error = spaceship.validateSync();

    if (error) {
        errorObject.error = "Parámetros incorrectos";
        return res.status(400).json(errorObject);
    }

    Spaceship.create(req.body, responseWithQuery(res));
});

router.post('/:id/inspect', (req, res) => {
    const inspector = req.body.inspector;

    if (!inspector) {
        errorObject.error = "Missing 'inspector' parameter";
        return res.status(400).json(errorObject);
    }
    // check inspection date
    const now = moment();

    Inspection.find({ spaceship_id: req.params.id })
        .select('date')
        .then(async inspections => {
            for (let inspection of inspections) {
                const momentDate = moment(inspection.date);

                console.log("Inspection date: " +  inspection.date);
                console.log("Moment inspection date: " + momentDate)

                if (momentDate.isSame(now, 'day')) {
                    throw new DateError("Only one inspection can be made each day")
                }
            }
        }).then(() => 
            Promise.all([
                Passenger.find()
                    .where('spaceship_id')
                    .equals(req.params.id)
                    .exec(),
                Inspection.find()
                    .select('id')
                    .sort({ id: -1 })
                    .limit(1)
                    .exec(),
                Spaceship.findOne({ id: req.params.id })
            ])
        ).then(([passengers, inspections, spaceship]) => {
            const nextId = inspections[0] ? inspections[0].id + 1 : 1;

            return Inspection.create({
                id: nextId,
                inspector: inspector,
                spaceship_id: req.params.id,
                passengers_ids: passengers.map(passenger => passenger.id),
                passengers: passengers,
                spaceship: spaceship,
                date: moment().toDate()
            });
        }).then(async (inspection) => {
            const inspect = await Inspection.populate(inspection, [{ path: 'passengers' }, { path: 'spaceship' }])
            
            okObject.result = inspect;
            return res.json(okObject);
        }).catch(error => {
            const status = error instanceof DateError ? 400 : 500;

            errorObject.error = error.message;
            res.status(status).json(errorObject);
        });
});

router.get('/:id/getPassengers', (req, res) => {
    Passenger.find({ spaceship_id: req.params.id }, responseWithQuery(res));
});

class DateError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = router;