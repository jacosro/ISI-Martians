const mongoose = require('mongoose');
const baseSchema = require('./abstract-schema');

const schema = baseSchema({
    inspector: String,
    spaceship: { type: mongoose.Schema.Types.ObjectId, ref: 'Spaceship' },
    date: Date,
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Passenger' }]
});

const Inspection = mongoose.model('Inspection', schema);

module.exports = Inspection;