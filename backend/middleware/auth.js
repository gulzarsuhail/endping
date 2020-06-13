const jwt = require('jsonwebtoken');

const {Users} = require("../models");

const verifyJWT = token => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
                if (decoded) resolve (decoded);
                else reject (err);
            });
        } catch (err) {
            reject (err);
        }
    })
}

/*
    Ensures user is logged in by checking if JWT token is valid
    @required params:
        URL params:
            id: id of current user
        Headers:
            Authorization: JWT token
    @return params:
        next(): if success
        next(error): if fails
*/
module.exports.loginRequired = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        await verifyJWT(token);
        next();
    } catch (e) {
        let error = new Error("Please log in first");
        error.status = 401;
        next(error);
    }
}


/*
    Ensures user is allowed to access the specific API endpoint
    *** ALSO ADDS req.user TO THE req PARAMETER ***
    @required params:
        URL params:
            id: id of current user
        Headers:
            Authorization: JWT token
    @return params:
        next(): if success
        next(error): if fails
*/
module.exports.ensureCorrectUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await verifyJWT(token);
        const user = await Users.findById(decoded._id);
        if (decoded && user) {
            req.user = user;
            next();
        } else {
            throw new Error();
        }
    } catch (e) {
        let error = new Error("Please log in first");
        error.status = 401;
        next(error);
    }
}