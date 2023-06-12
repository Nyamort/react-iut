import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import React from "react";

import "@css/note.css"
import {confirmDialog} from "primereact/confirmdialog";
import noteApi from "@api/noteApi";

const NoteComponent = (props) => {
    const toast = props.toast;
    const accept = () => {
        noteApi.deleteNote(props.note.uuid)
            .then(() => {
                props.dispatch({type: 'DELETE', note: props.note});
                toast.current.show({severity: 'success', summary: 'Note supprimée', life: 3000});
            })
            .catch((e) => {
                toast.current.show({severity: 'error', summary: 'Impossible de supprimer la note', life: 3000});
            })
    }

    const reject = () => {
        toast.current.show({severity: 'info', summary: 'Suppression annulée', life: 3000});
    }
    const confirm = () => {
        confirmDialog({
            message: 'Etes-vous sûr de vouloir supprimer cette note ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };


    const footer = (
        <div className={'actions'}>
            <Link to={`${props.note.uuid}`} className={'p-button-raised p-button button'}>
                <i className={'pi pi-eye'}></i>
                Voir
            </Link>
            <Link to={`${props.note.uuid}/edit`} className={'p-button-raised p-button button'}>
                <i className={'pi pi-pencil'}></i>
                Modifier
            </Link>
            <Button onClick={() => confirm()} label="Supprimer" icon="pi pi-trash"
                    className="p-button-danger p-button-raised"></Button>
        </div>
    );

    const truncate = (str, n) => {
        let strs = str.split('\n');
        if(strs.length > 1){
            str = strs[0]+'...';
        }
        return (str.length > n) ? str.substring(0, n - 1) + '...' : str;
    }

    return (
        <Card className={'note'} subTitle={props.note.category} title={props.note.name} footer={footer}>
            {truncate(props.note.content, 100)}
        </Card>
    )
}
export default NoteComponent