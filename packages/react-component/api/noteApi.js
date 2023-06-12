import axios from "@utils/axios";

const NoteApi = {
    getNotes: function() {
        return axios.get("/note");
    },
    getNote(uuid){
        return axios.get(`/note/${uuid}`);
    },
    postNote: function(note) {
        return axios.post("/note", note);
    },
    putNote: function(note) {
        return axios.put(`/note/${note.uuid}`, note);
    },
    deleteNote: function(uuid) {
        return axios.delete(`/note/${uuid}`);
    }
}

export default NoteApi;