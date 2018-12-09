const mongoose = require('mongoose');

function baseSchema(schema, options) {
    const res = new mongoose.Schema(schema, options);

    res.options.toJSON = {
        versionKey: false,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            return ret;
        }
    };

    return res;
}

module.exports = baseSchema;
