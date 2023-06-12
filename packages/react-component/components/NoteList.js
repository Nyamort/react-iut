import React from "react";

import "@css/noteList.css"
import NoteComponent from "@components/NoteComponent";
const NodeList = (props) => {

    return (
        <div>
            <div className={'content'}>
                <div className={'header'}>
                    <h1>Liste des notes</h1>
                </div>
                <div className={'notes'}>
                    {
                        props.notes.map((note) => (
                            <NoteComponent toast={props.toast} key={note.uuid} dispatch={props.dispatch} note={note}></NoteComponent>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default NodeList