const jwt = require('jsonwebtoken');

module.exports.loginRequired = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if (decoded) {
                next();
            } else {
                throw new Error("");
            }
        });
    } catch (e) {
        let error = new Error("Please log in first");
        error.status = 401;
        next(error);
    }
}

module.exports.ensureCorrectUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if (decoded && decoded.id === req.params.id) {
                next();
            } else {
                throw new Error("");
            }
        })
    } catch (e) {
        let error = new Error("Please log in first");
        error.status = 401;
        next(error);
    }
}