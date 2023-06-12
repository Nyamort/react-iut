const db = require('../database');

function getAllNoteByUser (user){
    return db.prepare('SELECT * FROM note WHERE user = ?;').all(user)
}

function postNote(note){
    db.prepare('INSERT INTO note (uuid, name, content, category, user) VALUES (@uuid, @name, @content, @category, @user);').run(note)
}

function putNote(note){
    db.prepare('UPDATE note SET name = @name, content = @content, category = @category WHERE uuid = @uuid;').run(note)
}

function deleteNote(uuid){
    db.prepare('DELETE FROM note WHERE uuid = @uuid;').run(uuid)
}

module.exports = {getAllNoteByUser,postNote,putNote,deleteNote}
