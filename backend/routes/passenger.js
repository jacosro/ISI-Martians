const router = require('express').Router();

const Passenger = require('../models/passenger');

router.get('/', (req, res) => {
    Passenger.find((error, passengers) => {
        if (error) {
            return res.status(400);
        }

        return res.json(passengers);
    });
});

router.get('/hello', (req, res) => {
    res.status(200).send('Hello!');
});

module.exports = router;