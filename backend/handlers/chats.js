const { Users, Chats } =  require('../models');

/*
    @required params:
        URL params:
            id: id of current user
        POST body:
            username: username of reciepient
    @return params:
        if success: all chats of the user
        if fail: 500 error message
*/
module.exports.fetchAllUserChats = async (req, res, next) => {
    try {
        const user = req.user;
        const chats =  await Chats.find({_id: {$in: user.chats}}).select("-messages").sort({'updatedAt':-1});
        // #TODO encrypt chat data
        return res.json(chats);
    } catch (err) {
        next(err);
    }
}

/*
    @required params:
        URL params:
            id: id of current user
        POST body:
            username: username of reciepient
    @return params:
        if success: new chat object
        if fail: 500 error message
*/
module.exports.createNewChat = async (req, res, next) => {
    try {
        
        const initiatorUser = req.user;
        const reciepientUser = await Users.findOne({username: req.body.username});
        
        // #WARNING could be used to find out which users exist
        if (!initiatorUser || !reciepientUser) throw Error("User does not exist");

        // check if user trying to start chat with themselves
        if (initiatorUser.username === reciepientUser.username) throw Error("Cannot start chat with yourself")

        // check if chat already exists
        const check1 = await Chats.findOne({initiator: initiatorUser.username, reciepient: reciepientUser.username});
        const check2 = await Chats.findOne({reciepient: initiatorUser.username, initiator: reciepientUser.username});

        if (check1 || check2) throw Error("Chat with this user already exists");
        
        const newChat = await Chats.create({
            initiator: initiatorUser.username,
            reciepient: reciepientUser.username,
            messages: []
        });

        initiatorUser.chats.push(newChat._id);
        reciepientUser.chats.push(newChat._id);

        await initiatorUser.save();
        await reciepientUser.save();

        // #TODO encrypt chat data
        return res.json(newChat);

    } catch (err) {
        next(err);
    }
}

/*
    @required params:
        URL params:
            chatid: id of chat to be deleted
    @return params:
        if success: ({success: true})
        if fail: 500 error message
*/
module.exports.deleteChat = async (req, res, next) => {
    try {
        const chat = await Chats.findById(req.params.chatid);
        await chat.remove();

        // #TODO encrypt all responses
        return res.json({success: true});
    } catch (err) {
        next (err);
    }
}

/*
    @required params:
        URL params:
            chatid: id of the cahat
        req properties:
            req.user: the current user
    @return params:
        if success: ({
            partnerKey: public key of partner,
            ...chat
        })
        if fail: 500 error message
*/
module.exports.sendChatById = async (req, res, next) => {
    try {
        const user = req.user;
        const chat = await Chats.findById(req.params.chatid);
        const partnerUsername = (chat.reciepient === user.username) ? chat.initiator : chat.reciepient;
        const partner = await Users.findOne({username: partnerUsername});

        if (chat.messages.length !== 0){
            if (chat.initiator === user.username) 
                chat.initiatorLastRead = chat.messages[chat.messages.length -1 ]._id;
            else 
                chat.reciepientLastRead = chat.messages[chat.messages.length -1 ]._id;
        }

        await chat.save();

        // #TODO encrypt all responses
        return res.json({
            partnerKey: partner.pubKey,
            ...chat.toObject(),
        });

    } catch (err) {
        next (err);
    }
}

/*
    @required params:
        URL params:
            chatid: id of the cahat
        req properties:
            req.user: the current user
    @return params:
        if success: created message object
        if fail: 500 error message
*/
module.exports.createNewMessage = async (req, res, next) => {
    try {
        const user = req.user;
        const chat = await Chats.findById(req.params.chatid);
        const userIsInitiator = (chat.initiator === user.username);
        // #TODO: reduce complexity to const instead of n
        if (chat.messages.length >= 20) {
            let partnerReadFlag = false;
            for (let i= chat.messages.length - 1 ; i >= chat.messages.length - 20 ; i--)
                if (userIsInitiator && chat.messages[i]._id.equals(chat.reciepientLastRead))
                    partnerReadFlag = true;
                else if (!userIsInitiator && chat.messages[i]._id.equals(chat.initiatorLastRead))    
                    partnerReadFlag = true;     
            if (partnerReadFlag) chat.messages.slice(0, chat.messages.length - 20 +1).forEach(e => chat.messages.remove(e._id));
            else throw Error ("Cannot sent more messages until other participant has read the previous messages");       
        }
        console.log(chat.messages.slice(0, chat.messages.length - 20 +1).map(e => e._id))
        const newMessage = {
            sender: user.username,
            senderMessage: req.body.senderMessage,
            recieverMessage: req.body.recieverMessage,
            time: Date.now()
        }
        chat.messages.push(newMessage);
        const resMessage = await chat.save();
        return res.json(resMessage.messages[resMessage.messages.length -1]);
    } catch (err) {
        next (err);
    }
}