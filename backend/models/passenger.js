const mongoose = require('mongoose');
const baseSchema = require('./abstract-schema');

const schema = baseSchema({
    name: String,
    spaceship: { type: mongoose.Schema.Types.ObjectId, ref: 'Spaceship'}
});

const Passenger = mongoose.model('Passenger', schema);

module.exports = Passenger;