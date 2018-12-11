const mongoose = require('mongoose');
const baseSchema = require('./base-schema');

const schema = baseSchema({
    id: Number,
    name: String,
    maxPassengers: Number,
    passengers: Number,
    fromMothership_id: Number,
    toMothership_id: Number
});

schema.virtual('fromMothership', {
    ref: 'Mothership',
    localField: 'fromMothership_id',
    foreignField: 'id',
    justOne: true
});

schema.virtual('toMothership', {
    ref: 'Mothership',
    localField: 'toMothership_id',
    foreignField: 'id',
    justOne: true
});

const populate = function() {
    this.populate('fromMothership');
    this.populate('toMothership');
};

schema.pre('find', populate);

schema.pre('findOne', populate);

module.exports = schema;