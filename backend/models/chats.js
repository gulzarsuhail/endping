const mongoose = require('mongoose');

const Users = require('./users');

const messageSchema = new mongoose.Schema ({
    time: {
        type: Date,
        default: Date.now
    },
    sender: {
        require: true,
        type: "String",
        ref: "Users"
    },
    senderMessage: {
        require: true,
        type: String,
    },
    recieverMessage: {
        require: true,
        type: String,
    }
})

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

    initiatorLastRead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chats.messages",
        default: null,
    },

    reciepientLastRead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chats.messages",
        default: null,
    },

    messages: [ messageSchema ],
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


// #TODO: only 20 messages are to be stored
chatSchema.pre("save", async function(next){
    try {
        if (this.messages.length > 20) {
            let initiatorFlag = false;
            let receipientFlag = false;
            for (let i = this.messages.length - 20; i < this.messages.length - 1; i++){
                if (this.initiatorLastRead.equals(this.messages[i]._id))
                    initiatorFlag = true;
                if (this.reciepientLastRead.equals(this.messages[i]._id))
                    receipientFlag = true;
            }
            if (initiatorFlag && receipientFlag) {        
                this.messages.remove(this.messages.slice(0, this.messages.length - 20));
                return next();
            } else {
                throw Error("Cannot sent more messages until other participant has read the previous messages");
            }
        } else {
            next();
        }
    } catch (err) {
        return next(err);
    }
})

module.exports = mongoose.model("Chats", chatSchema);