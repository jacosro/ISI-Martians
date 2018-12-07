const router = require('express').Router();

const Motherships = require('../models/mothership');
const errorObject = require('./baseRouting').errorObject;
const okObject = require('./baseRouting').okObject;

router.get('/', (req, res) => {
    Motherships.find((error, motherships) => {
        if (error) {
            errorObject.error = error;
            return res.status(400).json(errorObject);
        }

        okObject.result = motherships;
        return res.json(okObject);
    });
});

router.post('/', (req, res) => {

    // todo: check incoming object ?

    Motherships.create(req.body, (err, mothership) => {
        if (err) {
            errorObject.error = error;
            return res.status(400).json(errorObject);
        }

        okObject.result = mothership;
        return res.json(okObject);
    })
});



module.exports = router;