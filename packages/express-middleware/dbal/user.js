const db = require('../database');

function getUser (uuid){
    return db.prepare('SELECT * FROM user WHERE uuid = ?;').get(uuid)
}

module.exports = {getUser}