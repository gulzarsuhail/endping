const mongoose = require('mongoose');

const Users = require("./users");
const Chats = require("./chats");
const LoginChallenges = require("./loginChallenges");
const LocalMongoURI = "mongodb://localhost/endping";

mongoose.connect( process.env.MONGO_DB_URI || LocalMongoURI, 
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