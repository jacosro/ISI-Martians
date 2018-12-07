const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: String
});

const Mothership = mongoose.model('Mothership', schema);

module.exports = Mothership;