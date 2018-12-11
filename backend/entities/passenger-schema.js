const mongoose = require('mongoose');
const baseSchema = require('./base-schema');

const schema = baseSchema({
    id: Number,
    name: String,
    spaceship_id: Number
});

schema.virtual('spaceship', {
    ref: 'Spaceship',
    localField: 'spaceship_id',
    foreignField: 'id',
    justOne: true
});

schema.pre('find', function () {
    this.populate('spaceship');
});

schema.pre('findOne', function () {
    this.populate('spaceship');
});

schema.post('find', async function(docs) {
    for (let doc of docs) {
        await doc.populate('fromMothership').populate('toMothership').execPopulate();
    }
});

schema.post('findOne', async function(doc) {
    await doc.populate('fromMothership').populate('toMothership').execPopulate();
});

module.exports = schema;