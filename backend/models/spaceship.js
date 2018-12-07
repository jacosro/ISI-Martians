const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: String,
    maxPassengers: Number,
    passengers: Number,
    fromMothersip: { type: mongoose.Schema.Types.ObjectId, ref: 'Mothership' },
    toMothership: { type: mongoose.Schema.Types.ObjectId, ref: 'Mothership' }
});

const Spaceship = mongoose.model('Spaceship', schema);

module.exports = Spaceship;