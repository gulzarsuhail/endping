const express = require('express');
const router = express.Router();

const authHandler = require('../handlers/auth');

router.get("/signup/:username", authHandler.checkIfUsernameAvailable);

router.post("/signup", authHandler.newSignup);

router.get("/login/:username", function(req,res,next){console.log('here');next()}, authHandler.login);

router.post("/login", authHandler.verifyLogin);

module.exports = router;