const mongoose = require('mongoose');
const baseSchema = require('./base-schema');

const schema = baseSchema({
    id: { type: Number, unique: true, required: true, dropDups: true },
    name: { type: String, required: true },
    maxPassengers: { type: Number, required: true },
    fromMothership_id: { type: Number, required: true },
    toMothership_id: { type: Number, required: true }
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