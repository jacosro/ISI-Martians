const router = require('express').Router();

const Passenger = require('../models/passenger');
const Spaceship = require('../models/spaceship');
const errorObject = require('./baseRouting').errorObject;
const okObject = require('./baseRouting').okObject;


router.get('/', (req, res) => {
    Passenger.find((error, passengers) => {
        if (error) {
            errorObject.error = error;
            return res.status(400).json(errorObject);
        }

        okObject.result = passengers;
        return res.json(okObject);
    })
});

router.post('/', (req, res) => {

    // todo: check incoming object ?

    Passenger.create(req.body, (err, passenger) => {
        if (err) {
            errorObject.error = error;
            return res.status(400).json(errorObject);
        }

        okObject.result = passenger;
        return res.json(okObject);
    })
});

router.post('/board', (req, res) => {
    const data = req.body;

    // todo

    errorObject.error = "Not implemented";
    return res.status(400).json(errorObject);

    // if (!data.hasOwnProperty("spaceshipId") || !data.hasOwnProperty("passengerId")) {
    //     errorObject.error = "Data sent must contain spaceshipId and passengerId";
    //     return res.status(400).json(errorObject);
    // }
    //
    // Spaceship.findById(data.spaceshipId, (err, spaceship) => {
    //     if (err) {
    //         errorObject.error = err;
    //         return res.status(400).json(errorObject);
    //     }
    //
    //     if (spaceship.passengers >= spaceship.maxPassengers) {
    //         errorObject.error = "No more passengers can board on this spaceship!";
    //         return res.status(400).json(errorObject);
    //     }
    //
    //
    // })
    //
    // Passenger.findByIdAndUpdate(data.passengerId, {
    //     spaceship: data.spaceshipId
    // }, (err, res) => {
    //     if (err) {
    //         errorObject.error = err;
    //         return res.status(400).json(errorObject);
    //     }
    //
    //     Spaceship.findByIdAndUpdate(data.spaceshipId, {
    //
    //     }, (err, res) => {
    //         if (err) {
    //             errorObject.error = err;
    //             return res.status(400).json(errorObject);
    //         }
    //
    //         return res.json(okObject);
    //     })
    // })
    //
    //
    // okObject.result = null;
    // res.json(okObject);
});

router.post('/disembark', (req, res) => {
    // todo

    errorObject.error = "Not implemented";
    return res.status(400).json(errorObject);
})

module.exports = router;