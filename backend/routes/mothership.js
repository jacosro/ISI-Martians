const router = require('express').Router();

const Mothership = require('../models/mothership');

router.get('/', (req, res) => {
    Mothership.find((motherships, error) => {
        if (error) {
            return res.status(400);
        }

        return res.json(motherships);
    })
});

module.exports = router;