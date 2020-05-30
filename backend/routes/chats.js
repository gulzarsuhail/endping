const express = require('express');
const router = express.Router();

// send back list of all chats
// router.get("/", getAllChats)

// create a new chat
router.post("/", () => [])

// delete a chat
router.delete("/:chatid", () => [])

// send contents of one chat
router.get("/:chatid", ()=>[])

// create new message in the chat
router.post("/:chatid", ()=>[])

module.exports = router;
