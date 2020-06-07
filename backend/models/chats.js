const mongoose = require('mongoose');

const Users = require('./users');

const chatSchema = new mongoose.Schema({
    
    initiator: {
        type: "String",
        ref: 'Users',
        required: true,
    },

    reciepient: {
        type: "String",
        required: true,
        ref: 'Users',
    },

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
}, { timestamps: true });

chatSchema.pre("remove", async function(next){
    try{
        const userOne = await Users.findOne({username: this.initiator});
        const userTwo = await Users.findOne({username: this.reciepient});
        userOne.chats.remove(this.id);
        userTwo.chats.remove(this.id);
        await userOne.save();
        await userTwo.save();
        return next();
    } catch (err) {
        return next(err);
    }
});

module.exports = mongoose.model("Chats", chatSchema);