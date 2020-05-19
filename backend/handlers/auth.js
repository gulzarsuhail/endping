const crypto = require("crypto");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const fs = require('fs'); 
const { publicEncrypt, publicDecrypt } = require('crypto');
const { Users, LoginChallenges } =  require('../models');

/*
    @required params:
        JSON body:
            username: new user's username
            pubKey: new user's publickey
    @return params:
        if success: JWT
        if fail: next(err)
*/
module.exports.newSignup = async (req, res, next) => {
    try {
        const {_id, username} = await Users.create(req.body)
        const token = jwt.sign({ _id, username }, process.env.JWT_SECRET_KEY);
        return res.status(200).json({
            _id,
            username,
            token
        });
    } catch (err) {
        if (err.code === 11000) err.message = "Username already taken";
        err.status = 400;
        return next (err);
    }
}

/*
    @required arguments
        url-params:
            username: username
    @return values
        JSON Object: (returned even in params incorrenct)
            _id: the id of challenge
            challenge: base64 encoded public key encrypted random string
        next(err): if error encountered
*/
module.exports.login = async (req, res, next) => {
    try {
        const user = await Users.findOne({username: req.params.username});
        const challenge = crypto.randomBytes(20).toString('hex');
        const encryptBuffer = Buffer.from(challenge);
        let _id;
        let encryptedChallenge;
        if (!user) {
            const dummyPublicKey = fs.readFileSync(__dirname+ "/../resources/dummyPublicKey.pem").toString();
            _id = mongoose.Types.ObjectId();
            encryptedChallenge = publicEncrypt(dummyPublicKey, encryptBuffer);
        }else  {
            const newChallenge = await LoginChallenges.create({
                username: req.params.username,
                challenge
            });
            _id = newChallenge._id;
            encryptedChallenge = publicEncrypt(user.pubKey, encryptBuffer);
        }
        return res.json({ _id, challenge: encryptedChallenge.toString("base64") });
    } catch (err) {
        err.status = 403;
        return next (err);
    }
}

/*
    @required arguments
        JSON body - 
            _id : _id of the challenge
            username: username
            challege: challenge solution encrypted with private key base64 encoded
    @return values
        AWT: token if challenge solved
        next(): if error encountered 
*/
module.exports.verifyLogin = async (req, res, next) => {
    try {
        const challengeTask = await LoginChallenges.findOne({_id : req.body._id, username: req.body.username });
        if (!challengeTask ) throw new Error ('Invalid request');
        if (Date.now() - challengeTak.date > 300000) throw new Error ("Challenge expired");
        const user = Users.findOne({username: req.body.username});
        const challengeBuffer = Buffer.from(req.body.challenge, 'base64')
        const challengeSoln = publicDecrypt(user.pubKey, challengeBuffer);
        if (challengeSoln !== challengeTask.challenge) throw new Error("Challenge failed");
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET_KEY);
        return res.status(200).json({
            _id,
            username,
            token
        });
    } catch (err) {
        err.status = 403;
        return next(err);
    }
}
