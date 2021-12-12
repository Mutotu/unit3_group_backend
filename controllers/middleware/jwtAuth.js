const models = require('../../models');
const jwt = require('jsonwebtoken');

const jwtAuth = {};

jwtAuth.verifyToken = function (req, res, next) {
    const token = req.headers.authorization;
    console.log("header auth token is: ", token);

    if (!token) {
        return res.status(403).send({ message: "No authorization token provided." });
    }
    else {
        console.log("token found to be true");
        try {
            const verification = jwt.verify(token, process.env.JWT_SECRET);
            console.log(verification);
            req.verifiedId = verification.id;
            next();
        }
        catch (err) {
            res.status(400).send({ message: "Verification failed." });
        }

    }
}

module.exports = jwtAuth;