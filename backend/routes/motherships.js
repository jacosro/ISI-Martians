const router = require('express').Router();

const Mothership = require('../entities/models').Mothership;
const responseWithQuery = require('./baseRouting').responseWithQuery;

router.get('/', (req, res) => {
    Mothership.find(responseWithQuery(res));
});

router.get('/:id', (req, res) => {
    const reqId = req.params.id;

    Mothership.findOne({ id: reqId }, responseWithQuery(res));
});

router.post('/', (req, res) => {

    // todo: check incoming object ?

    Mothership.create(req.body, responseWithQuery(res));
});



module.exports = router;