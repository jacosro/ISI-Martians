const router = require('express').Router();

const Mothership = require('../entities/models').Mothership;
const responseWithQuery = require('./baseRouting').responseWithQuery;

const errorObject = require('./baseRouting').errorObject;
const okObject = require('./baseRouting').okObject;

router.get('/', (req, res) => {
    Mothership.find(responseWithQuery(res));
});

router.get('/:id', (req, res) => {
    const reqId = req.params.id;

    Mothership.findOne({ id: reqId }, responseWithQuery(res));
});

router.post('/', (req, res) => {

    const mothership = new Mothership(req.body);

    const error = mothership.validateSync();

    if (error) {
        errorObject.error = "Error al crear la nave nodriza: Revise los parámetros de entrada";
        return res.status(400).json(errorObject);
    }

    Mothership.create(mothership)
        .then(passenger => {
            okObject.result = passenger;
            res.json(okObject);
        }).catch(error => {
            errorObject.error = "Error al crear la nave nodriza: Ya existe una nave nodriza con esa id";
            res.status(400).json(errorObject);
        });
});



module.exports = router;