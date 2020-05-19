const express = require('express');
const router = express.Router();

const auth = require('../handlers/auth');

router.post("/", auth.newSignup);

router.get("/login/:username", auth.login);

router.post("/login", auth.verifyLogin);

module.exports = router;