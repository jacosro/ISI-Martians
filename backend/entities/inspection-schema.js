const baseSchema = require('./base-schema');

const schema = baseSchema({
    id: { type: Number, unique: true, required: true, dropDups: true },
    inspector: { type: String, required: true },
    spaceship_id: { type: Number, required: true },
    date: { type: Date, required: true },
    passengers_ids: { type: [Number], required: true },
});

schema.virtual('spaceship', {
    ref: 'Spaceship',
    localField: 'spaceship_id',
    foreignField: 'id',
    justOne: true
});

schema.virtual('passengers', {
    ref: 'Passenger',
    localField: 'passengers_ids',
    foreignField: 'id',
    justOne: false
});

// schema.pre('find', function() {
//     this.populate('spaceship');
//     this.populate('passengers')
// });

// schema.pre('findOne', function() {
//     this.populate('spaceship');
//     this.populate('passengers')
// });

// schema.post('find', async function(docs) {
//     for (let doc of docs) {
//         await doc.populate('fromMothership').populate('toMothership').execPopulate();
//     }
// })

// schema.post('findOne', async function(docs) {
//     for (let doc of docs) {
//         await doc.populate('fromMothership').populate('toMothership').execPopulate();
//     }
// })

module.exports = schema;