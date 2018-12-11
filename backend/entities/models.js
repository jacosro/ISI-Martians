const mongoose = require('mongoose');

const passengerSchema = require('./passenger-schema');
const spaceshipSchema = require('./spaceship-schema');
const inspectionSchema = require('./inspection-schema');
const mothershipSchema = require('./mothership-schema');

const Mothership = mongoose.model('Mothership', mothershipSchema);
const Spaceship = mongoose.model('Spaceship', spaceshipSchema);
const Passenger = mongoose.model('Passenger', passengerSchema);
const Inspection = mongoose.model('Inspection', inspectionSchema);

module.exports = {
    Mothership: Mothership,
    Spaceship: Spaceship,
    Passenger: Passenger,
    Inspection: Inspection
};