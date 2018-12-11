const router = require('express').Router();

const Passenger = require('../entities/models').Passenger;
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