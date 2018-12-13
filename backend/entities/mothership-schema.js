const mongoose = require('mongoose');
const baseSchema = require('./base-schema');

const schema = baseSchema({
    id: { type: Number, unique: true, required: true, dropDups: true },
    name: { type: String, required: true },
});


module.exports = schema;