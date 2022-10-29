const jwt = require('jsonwebtoken');

// middleware function to check the token before accessing private API URL
module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // console.log("verified: ", verified);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
}