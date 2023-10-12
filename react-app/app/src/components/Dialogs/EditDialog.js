import React from 'react';
import {OverlayDialog} from './OverlayDialogFrame.js'
import './../styleSheets/EditDialog.css';

export const EditDialog = (props)=>
{
    let content = (
        <div>
            <h2>{props.title}</h2>
            <div>
                <form className="editForm">
                    <p className="editForm-">ID zum Bearbeiten</p>
                    <input className="editForm-input" type="text" value={props.inputFieldValue} disabled={true}/>
                </form>
            </div>
            <div className="regular-text-container">
                <p className="regular-text">
                    1. Schicken Sie diesen Link z.B. per E-Mail an das iPad, auf dem Sie die Messung bearbeiten wollen.<br/>
                    2. Auf dem iPad: Öffnen sie die E-Mail und klicken Sie auf den Link.<br/>
                    3. Die stairlication-App sollte sich öffnen und die Messung herunterladen.<br/>
                    4. Danach können Sie die Messung bearbeiten und die überarbeitete Version hochladen.<br/>
                </p>
            </div>
        </div>);

    return (
    <OverlayDialog width={800} height={400} measure="px" isVisible={true} closeOnEsc={true}>
        {content}
    </OverlayDialog>);
}