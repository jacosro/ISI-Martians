const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: String,
    maxPassengers: Number,
    fromMothersip: mongoose.SchemaTypes.String,
    toMothership: mongoose.SchemaTypes.String
});

const Spaceship = mongoose.model('Spaceship', schema);

module.exports = Spaceship;