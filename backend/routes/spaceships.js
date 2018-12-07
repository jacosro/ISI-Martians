const router = require('express').Router();

const Spaceships = require('../models/spaceship');
const Inspection = require('../models/inspection');

const errorObject = require('./baseRouting').errorObject;
const okObject = require('./baseRouting').okObject;

router.get('/', (req, res) => {
    Spaceships.find((error, spaceships) => {
        if (error) {
            errorObject.error = error;
            return res.status(400).json(errorObject);
        }

        okObject.result = spaceships;
        return res.json(okObject);
    })
});

router.post('/', (req, res) => {

    // todo: check incoming object ?

    Spaceships.create(req.body, (err, spaceship) => {
        if (err) {
            errorObject.error = error;
            return res.status(400).json(errorObject);
        }

        okObject.result = spaceship;
        return res.json(okObject);
    })
});

router.post('/:id/inspect', (req, res) => {
    // todo

    errorObject.error = "Not implemented";
    return res.status(400).json(errorObject);
});

module.exports = router;