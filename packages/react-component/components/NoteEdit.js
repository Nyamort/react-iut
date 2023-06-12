import {useEffect, useState} from "react"
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import "@css/noteCreate.css"
import {InputTextarea} from "primereact/inputtextarea";
import {useNavigate, useParams} from "react-router-dom";
import noteApi from "@api/noteApi";

const NoteEdit = (props) => {
    const {uuid} = useParams()
    let note = {name: "", content: "", category: ""}
    const [inputs, setInputs] = useState(note)
    const navigate = useNavigate();

    useEffect(() => {
        if(!props.notes) return
        let note = props.notes.find(noteid => noteid.uuid === uuid)
        if (note) {
            setInputs(note)
        }
    }, [props.notes])


    const categ = [
        {label: 'secret', value: 'secret'},
        {label: 'work', value: 'work'},
        {label: 'personal', value: 'personal'},
    ]

    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value})
    }

    const postData = (event) => {
        event.preventDefault()
        noteApi.putNote(inputs)
            .then((res) => {
                props.dispatch({type: 'EDIT', note: res.data});
                navigate('/note/')
                props.toast.current.show({severity: 'success', summary: 'Note modifié', life: 3000});
            })
            .catch(()=>{
                props.toast.current.show({severity: 'error', summary: 'Impossible de créer la note', life: 3000});
            })
    }

    return (
        <div>
            <div className={'formulaire'}>
                <h1>Ajouter une note</h1>
                <form onSubmit={postData}>
                    <label>
                        <InputText name="name" value={inputs.name} placeholder='Nom'
                                   onChange={handleChange}/>
                    </label>
                    <label>
                        <InputTextarea name="content" className={'input-content'} value={inputs.content}
                                       placeholder='Contenu' onChange={handleChange}></InputTextarea>
                    </label>
                    <label>
                        <Dropdown filter name="category" value={inputs.category} options={categ} onChange={handleChange}
                                  placeholder="Sélectionner une catégorie"/>
                    </label>
                    <label>
                        <Button label="Editer"/>
                    </label>
                </form>
            </div>
        </div>
    );
};
export default NoteEdit;
