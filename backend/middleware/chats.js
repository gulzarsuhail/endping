const { Chats } = require("../models");

/*
    Ensures the user is allowed to change a chat
    @required URL params:
        chatid: the id of chat
    @req properties
        req.user: the current user object (can be attached using ./auth.js/ensureCorrectUser)
    @return params:
        next(): if success
        next(error): if fails
*/
module.exports = async (req, res, next) => {
    const chat = await Chats.findById(req.params.chatid);
    if (chat && (chat.initiator === req.user.username || chat.reciepient === req.user.username)) {
        next();
    } else {
        const err = new Error ("You do not have permission to do that.");
        err.status = 403;
        next(err);
    }
}