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
    const inspection = new Inspection(req.body);

    const error = inspection.validateSync()

    if (error) {
        errorObject.error = error;
        return res.status(400).json(errorObject);
    }

    
    
    Inspection.create(inspection, responseWithQuery(res));
});



module.exports = router;