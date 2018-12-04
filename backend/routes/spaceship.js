const router = require('express').Router();

const Spaceship = require('../models/spaceship');

router.get('/', (req, res) => {
    Spaceship.find((aircrafts, error) => {
        if (error) {
            return res.status(400);
        }

        return res.json(aircrafts);
    })
});

module.exports = router;