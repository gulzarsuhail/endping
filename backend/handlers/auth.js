const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');

const { 
    publicEncryptUsingDummyKey, 
    publicEncryptServerPublicKey, 
    publicDecryptUsingKey, 
    publicEncryptUsingKey 
} = require("./encrypt");

const { Users, LoginChallenges } = require('../models');

/*
    @required params:
        JSON body:
            username: new user's username
    @return params:
        if success: {available: true}
        if fail: {availabe: false}
*/
module.exports.checkIfUsernameAvailable = async (req, res, next) => {
    try {
        const username = req.params.username;
        const dbQuery = await Users.findOne({username});
        if (!dbQuery) {
            return res.json({
                available: !(dbQuery)
            });
        } else {
            // #WARNING could be used to find which users exist
            const err = new Error ("Username already taken");
            err.status = 400;
            throw err;
        }
    } catch (err) {
        next(err);
    }
}

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

        const { _id, username, pubKey } = await Users.create(req.body);
        const token = jwt.sign({ _id, username }, process.env.JWT_SECRET_KEY);
        return res.status(200).json({
            user: {
                _id,
                username,
            },
            token,
            server_key: publicEncryptServerPublicKey(pubKey),
            pubKey,
        });

    } catch (err) {
        if (err.code === 11000) err.message = "Username already taken";
        err.status = 400;
        return next(err);
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
module.exports.sendLoginChallenge = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            username: req.params.username
        });
        const challenge = randomBytes(20).toString('hex');
        let _id;
        let encryptedChallenge;
        if (!user) {
            _id = mongoose.Types.ObjectId();
            encryptedChallenge = publicEncryptUsingDummyKey(challenge);
        } else {
            const newChallenge = await LoginChallenges.create({
                username: req.params.username,
                challenge
            });
            _id = newChallenge._id;
            encryptedChallenge = publicEncryptUsingKey(user.pubKey, challenge);
        }
        return res.json({
            _id,
            challenge: encryptedChallenge,
        });
    } catch (err) {
        err.status = 403;
        return next(err);
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
        const challengeTask = await LoginChallenges.findOne({
            _id: req.body._id,
            username: req.body.username
        });
        if (!challengeTask) throw new Error('Invalid request');
        if (Date.now() - challengeTask.date > 300000) throw new Error("Challenge expired");
        const user = await Users.findOne({
            username: req.body.username
        });
        let challengeSoln = null;
        try {
            challengeSoln = publicDecryptUsingKey(user.pubKey, req.body.challengeSoln);
        } catch (err) {
            throw new Error ("Challenge failed");
        }
        if (challengeSoln !== challengeTask.challenge) throw new Error("Challenge failed");
        const token = jwt.sign({
            _id: user._id,
            username: user.username
        }, process.env.JWT_SECRET_KEY);
        return res.status(200).json({
            user: {
                _id: user._id,
                username: user.username,
            },
            token,
            server_key: publicEncryptServerPublicKey(user.pubKey),
            pubKey: user.pubKey,
        });
    } catch (err) {
        err.status = 403;
        return next(err);
    }
}
