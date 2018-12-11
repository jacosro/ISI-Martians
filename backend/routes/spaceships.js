const router = require('express').Router();

const Spaceship = require('../entities/models').Spaceship;

const errorObject = require('./baseRouting').errorObject;
const okObject = require('./baseRouting').okObject;
const responseWithQuery = require('./baseRouting').responseWithQuery;

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
    // todo

    errorObject.error = "Not implemented";
    return res.status(400).json(errorObject);
});

module.exports = router;