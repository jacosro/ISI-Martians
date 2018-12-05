const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: String,
    maxPassengers: Number,
    fromMothersip: mongoose.SchemaTypes.String,
    toMothership: mongoose.SchemaTypes.String
});

const Mothership = mongoose.model('Mothership', schema);

module.exports = Mothership;