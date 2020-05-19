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
        minlength: 750,
        maxlength: 850,
        unique: true,
    },
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        }
    ],
    texts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Texts",
        }
    ]
});

module.exports = mongoose.model("Users", userSchema);