const router = require('express').Router();

const Inspection = require('../entities/models').Inspection;
const responseWithQuery = require('./baseRouting').responseWithQuery;

router.get('/', (req, res) => {
    Inspection.find(responseWithQuery(res));
});

router.get('/:id', (req, res) => {
    const reqId = req.params.id;

    Inspection.findOne({ id: reqId }, responseWithQuery(res));
});

router.post('/', (req, res) => {

    // todo: check incoming object ?

    Inspection.create(req.body, responseWithQuery(res));
});



module.exports = router;