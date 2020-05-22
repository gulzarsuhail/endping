const mongoose = require('mongoose');

const textsSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chats"
    },
    time: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Texts", textsSchema);