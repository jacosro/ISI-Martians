const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: String
    // maxPassengers: Number,
    // fromMothersip: mongoose.SchemaTypes.String,
    // toMothership: mongoose.SchemaTypes.String
});

const Passenger = mongoose.model('Passenger', schema);

module.exports = Passenger;