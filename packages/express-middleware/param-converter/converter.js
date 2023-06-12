const db = require('../database')
module.exports = converter = (table, userCheck = false, paramKey = 'uuid',primaryKey = 'uuid') => {
    return (req, res, next) => {
        const payload = {
            primaryKey: req.params[paramKey],
            user: userCheck ? req.user.uuid : undefined
        }
        const row = db.prepare(`SELECT * FROM ${table} WHERE ${primaryKey} = @primaryKey ${userCheck ? 'AND user = @user' : ''}`).get(payload);
        if (!row) return res.status(404).send(`${table} not found`);
        req[table] = row;
        next();
    }
}