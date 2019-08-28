const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, keys.secretOrKey);
        req.userData = decoded;
        next()
    }
    catch (error) {
        res.status(401).json({
            Error: 'Auth Failed'
        })
    }
}