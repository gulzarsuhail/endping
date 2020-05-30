const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 64,
        required: true,
        unique: true,
    },
    pubKey: {
        type: String,
        required: true,
        minlength: 450,
        maxlength: 450,
        unique: true,
    },
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chats",
        }
    ]
});

module.exports = mongoose.model("Users", userSchema);