const mongoose = require('mongoose');
const baseSchema = require('./abstract-schema');

const schema = baseSchema({
    name: String
});

const Mothership = mongoose.model('Mothership', schema);

module.exports = Mothership;