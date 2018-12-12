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

    // todo: check incoming object ?

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

    Inspection.find({
        date: {
            $gte: now.subtract(1, 'days').toDate(),
            // $lte: now.
        }
    });

    // get all passengers of the spaceship

    Promise.all([
        Passenger.find()
            .select('id')
            .where('spaceship_id')
            .equals(req.params.id)
            .exec(),
        Inspection.find()
            .select('id')
            .sort({ id: -1 })
            .limit(1)
            .exec()
    ]).then(([passengersIds, inspectionIds]) => {
        let id = inspectionIds[0];

        if (!id) {
            id = 1;
        } else {
            id += 1;
        }

        Inspection.create({
            id: id,
            inspector: inspector,
            spaceship_id: req.params.id,
            passengers_id: passengersIds,
            date: moment().toDate()
        }, (error, res) => {
            if (!error) {
                errorObject.error = error.toString();
                return res.status(500).json(errorObject);
            }

            okObject.result = res;
            return res.json(okObject);
        })
    });

    // errorObject.error = "Not implemented";
    // return res.status(400).json(errorObject);
});

module.exports = router;