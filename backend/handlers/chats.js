const { Users, Chats } =  require('../models');

/*
    @required params:
        URL params:
            id: id of cuurent user
        POST body:
            username: username of reciepient
    @return params:
        if success: all chats of the user
        if fail: 500 error message
*/
module.exports.fetchAllUserChats = async (req, res, next) => {
    try {
        const user = req.user;
        const chats =  await Chats.find({_id: {$in: user.chats}});

        // #TODO encrypt chat data
        return res.json(user);

    } catch (err) {
        next(err);
    }
}

/*
    @required params:
        URL params:
            id: id of cuurent user
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
        if (!initiatorUser || !reciepientUser) throw Error("User does not exist.");

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

module.exports.sendChatById = async (req, res, next) => {
    try {
        const user = req.user;
        const chat = await Chats.findById(req.params.chatid);

        const partnerUsername = (chat.reciepient === user.username) ? chat.initiator : chat.reciepient;
        const partner = await Users.findOne({username: partnerUsername});

        // #TODO encrypt all responses
        return res.json({
            partnerPubKey: partner.pubKey,
            chat,
        });

    } catch (err) {
        next (err);
    }
}

module.exports.createNewMessage = async (req, res, next) => {
    try {
        const user = req.user;
        const chat = await Chats.findById(req.params.chatid);
        const recieverUsername = (chat.reciepient === user._id) ? chat.initiator : chat.reciepient;
        const receiver = await Users.findOne({username: recieverUsername});
        const newMessage = {
            sender: user._id,
            receiver: receiver._id,
            senderMessage: req.body.senderMessage,
            recieverMessage: req.body.recieverMessage,
            time: Date.now()
        }

        chat.messages.push(newMessage);
        await chat.save();
        return res.json(newMessage);
    } catch (err) {
        next (err);
    }
}