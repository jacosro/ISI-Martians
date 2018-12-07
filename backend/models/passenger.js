const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: String,
    spaceship: { type: mongoose.Schema.Types.ObjectId, ref: 'Spaceship'}
});

const Passenger = mongoose.model('Passenger', schema);

module.exports = Passenger;