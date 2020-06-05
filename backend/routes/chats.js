const express = require('express');
const router = express.Router({ mergeParams : true });

const chats = require("../handlers/chats");

const checkChatPermission = require("../middleware/chats");

// send back list of all chats
router.get("/", chats.fetchAllUserChats);

// create a new chat
router.post("/", chats.createNewChat);

// delete a chat
router.delete("/:chatid", checkChatPermission, chats.deleteChat);

// send contents of one chat
router.get("/:chatid", checkChatPermission, chats.sendChatById);

// create new message in the chat
router.post("/:chatid", checkChatPermission, chats.createNewMessage);

module.exports = router;
