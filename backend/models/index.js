const mongoose = require('mongoose');

const Users = require("./users");
const Chats = require("./chats");
const LoginChallenges = require("./loginChallenges");

mongoose.connect("mongodb://localhost/endping", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true 
    }
);

// mongoose.set("debug", true);
mongoose.Promise = Promise;

module.exports ={
    Users,
    Chats,
    LoginChallenges,
}