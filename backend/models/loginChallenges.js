const mongoose = require("mongoose");

const loginChallengeSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        ref: "Users",
        required: true,
    },
    challenge: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("LoginChallenges", loginChallengeSchema);