const {expressjwt: jwt} = require("express-jwt");
const userSql = require("../dbal/user");

module.exports = [
    jwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}),
    (req, res, next) => {
        const user = userSql.getUser(req.auth.sub);
        if (!user) return res.status(401).send("User not found");
        req.user = user;
        next();
    },
    (err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(401).send('Invalid token')
        }
        next()
    }
]