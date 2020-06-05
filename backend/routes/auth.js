const express = require('express');
const router = express.Router({ mergeParams : true });

const authHandler = require('../handlers/auth');

router.get("/signup/:username", authHandler.checkIfUsernameAvailable);

router.post("/signup", authHandler.newSignup);

router.get("/login/:username", authHandler.sendLoginChallenge);

router.post("/login", authHandler.verifyLogin);

module.exports = router;