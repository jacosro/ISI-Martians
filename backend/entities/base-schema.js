const mongoose = require('mongoose');

function baseSchema(schema, options) {
    const res = new mongoose.Schema(schema, options);

    res.options.toObject = {
        virtuals: true
    };

    res.options.toJSON = {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            return ret;
        }
    };

    return res;
}

module.exports = baseSchema;
