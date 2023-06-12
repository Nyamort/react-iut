
const noteSql = require('./dbal/note.js')

function getNote (uuid){
    return noteSql.getAllNoteByUser(uuid)
}

function postNote (note){
    return noteSql.postNote(note)
}

function putNote (note){
    return noteSql.putNote(note)
}

function deleteNote (object){
    return noteSql.deleteNote(object)
}

module.exports = {getNote,postNote,putNote,deleteNote}