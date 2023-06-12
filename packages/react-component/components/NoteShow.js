
import { Card } from 'primereact/card'
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import "@css/noteShow.css"
import Header from "./Header";

const NoteShow = (props) => {
    let { uuid } = useParams()
    let note = props.notes.find(noteid => noteid.uuid === uuid)
    if(!note) {
        note = { uuid: "", name: "", content: "", category: "", user: "" }
    }
    return (
        <div>
            <div className="panel">
            <Card className="card" title={note.name} subTitle={note.category}>
                {note.content}
            </Card>
            </div>
        </div>
    )
    
}

export default NoteShow;