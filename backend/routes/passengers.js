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

    // todo: check incoming object ?

    const passenger = new Passenger(req.body);

    const error = passenger.validateSync();

    if (error) {
        errorObject.error = error;
        return res.status(400).json(errorObject);
    }

    Passenger.create(passenger, responseWithQuery(res));
});

router.post('/:id/board', (req, res) => {
    const spaceshipId = req.body.spaceshipId;

    if (!spaceshipId) {
        errorObject.error = "Parameter 'spaceshipId' is missing";
        return res.status(400).json(errorObject);
    }

    Promise.all([
        Passenger.find({ spaceship_id: req.params.id }),
        Spaceship.findOne({ id: req.params.id }, 'maxPassengers')
    ]).then(([passengers, spaceship]) => {
        if (passengers.length >= spaceship.maxPassengers) {
            errorObject.error = `Spaceship with id ${spaceshipId} has reached its max capacity`;
            return res.status(400).json(errorObject);
        } 
        
        Promise.all([
            Passenger.findOneAndUpdate({ id: req.params.id }, { $set: { spaceship_id: spaceshipId }}),
            Spaceship.findOneAndUpdate({ id: spaceshipId }, { $inc: { maxPassengers: 1 }})
        ]).then(() => {
            okObject.result = null;
            return res.json(okObject);
        }).catch ((error) => {
            errorObject.error = error.toString();
            return res.status(500).json(errorObject);
        });
    }).catch((error) => {
        errorObject.error = error.toString();
        return res.status(500).json(errorObject);
    });
});

router.post('/:id/unboard', (req, res) => {
    Passenger.findOne({ id: req.params.id }, 'passenger_id spaceship_id', (error, passenger) => {
        if (error) {
            errorObject.error = error.toString();
            return res.status(500).json(errorObject);
        }

        Passenger.findOneAndUpdate({ id: req.params.id }, { $set: { spaceship_id: null }})
            .then(() => Spaceship.findOneAndUpdate({ id: passenger.spaceship_id }, { $inc: { maxPassengers: -1 }}))
            .then(() => {
                okObject.result = null;
                return res.json(okObject);
            })
            .catch(error => {
                errorObject.error = error.toString();
                return res.status(500).json(errorObject);
            });
    })

    // errorObject.error = "Not implemented";
    // return res.status(400).json(errorObject);
});

module.exports = router;