import {useState} from "react"
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import "@css/noteCreate.css"
import {InputTextarea} from "primereact/inputtextarea";
import noteApi from "@api/noteApi";
import {useNavigate} from "react-router-dom";

const NoteCreate = (props) => {
    const [inputs, setInputs] = useState({name: '', content: '', category: ''})
    const navigate = useNavigate();

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
        noteApi.postNote(inputs)
            .then((res) => {
                props.dispatch({type: 'CREATE', note: res.data});
                navigate('/note/')
                props.toast.current.show({severity: 'success', summary: 'Note ajouté', life: 3000});
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
                               onChange={handleChange} minLength="5"/>
                </label>
                <label>
                    <InputTextarea name="content" className={'input-content'} value={inputs.content} placeholder='Contenu' onChange={handleChange} minLength="5" ></InputTextarea>
                </label>
                <label>
                    <Dropdown filter name="category" value={inputs.category} options={categ} onChange={handleChange}
                              placeholder="Sélectionner une catégorie"/>
                </label>
                <label>
                    <Button label="Ajouter"/>
                </label>
            </form>
        </div>
      </div>
    );
};
export default NoteCreate;
