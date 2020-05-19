const mongoose = require('mongoose');

const textsSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    time: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Texts", textsSchema);