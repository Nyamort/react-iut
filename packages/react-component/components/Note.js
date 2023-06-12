import {useEffect, useReducer, useRef} from "react";
import {Route, Routes} from "react-router-dom";
import noteApi from "@api/noteApi";
import NoteList from "@components/NoteList";
import NoteCreate from "@components/NoteCreate";
import NoteShow from "@components/NoteShow";
import {Toast} from "primereact/toast";
import {ConfirmDialog} from "primereact/confirmdialog";
import NoteEdit from "@components/NoteEdit";
import GuardedRoute from "@components/GuardedRoute";

const Note = () => {
    const toast = useRef(null);

    const reducer = (notes, action) => {
        switch (action.type.toUpperCase()) {
            case 'DELETE':
                notes = notes.filter((note) => note.uuid !== action.note.uuid);
                return [...notes];
            case 'CREATE':
                notes.push(action.note)
                return [...notes];
            case 'EDIT':
                let i = notes.findIndex(n => n.uuid === action.note.uuid)
                notes[i] = action.note
                return [...notes];
            case 'LOAD':
                return [...action.notes];
        }
    }
    const [notes, dispatch] = useReducer(reducer, [])

    useEffect(() => {
        noteApi.getNotes().then((response) => {
            dispatch({type: 'LOAD', notes: response.data})
        })
    }, []);
    return (
        <div>
            <Toast ref={toast}/>
            <ConfirmDialog/>
            <Routes>
                <Route exact path={"/"} element={<NoteList toast={toast} dispatch={dispatch} notes={notes}/>}></Route>
                <Route exact path={"/:uuid"} element={<NoteShow notes={notes}/>}></Route>
                <Route exact path={"/:uuid/edit"} element={<NoteEdit toast={toast} notes={notes} dispatch={dispatch}/>}></Route>
                <Route exact path={"/create"} element={<NoteCreate toast={toast} dispatch={dispatch}/>}></Route>
            </Routes>
        </div>
    )
}

export default Note