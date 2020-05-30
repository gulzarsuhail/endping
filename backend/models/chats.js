const mongoose = require('mongoose');

const Users = require('./users');

const chatSchema = new mongoose.Schema({
    text: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Texts'
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    messages: [
        {
            time: {
                type: Date,
                default: Date.now
            },
            sender: {
                require: true,
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users"
            },
            senderMessage: {
                require: true,
                type: String,
            },
            receiver: {
                require: true,
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users"
            },
            recieverMessage: {
                require: true,
                type: String,
            }
        }
    ],
    time: {
        type: Date,
        default: Date.now,
    }
});

chatSchema.pre("remove", async function(next){
    try{
        const users = await Users.find({_id: {$in: this.users}});
        // #TODO extend this function to be scalable
        users[0].chats.remove(this.id);
        users[1].chats.remove(this.id);
        await users[0].save();
        await users[1].save();
        return next();
    } catch (err) {
        return next(err);
    }
});

module.exports = mongoose.model("Chats", chatSchema);