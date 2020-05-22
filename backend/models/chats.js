const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    text: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Texts'
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

module.exports = mongoose.model("Chats", chatSchema);