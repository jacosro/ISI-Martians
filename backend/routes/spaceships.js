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
        errorObject.error = "Error al crear la nave: Revise los parámetros de entrada";
        return res.status(400).json(errorObject);
    }

    Spaceship.create(req.body)
        .then(spaceship => {
            okObject.result = spaceship;
            res.json(okObject);
        }).catch(error => {
            errorObject.error = "Error al crear la nave: Ya existe una nave con esa id";
            res.status(400).json(errorObject);
        });
});

router.get('/:id/getPassengers', (req, res) => {
    Passenger.find({ spaceship_id: req.params.id }, responseWithQuery(res));
});

module.exports = router;