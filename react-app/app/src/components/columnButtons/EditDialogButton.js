import React from 'react';
import ReactDOM from 'react-dom';
import {EditDialog} from './../Dialogs/EditDialog.js';

export function EditDialogButton(row)
{
    return (
        <button className="cell-button" onClick={() => {OpenEditDialog(row)}}>Bearbeiten</button>
    );   
}

function OpenEditDialog(row)
{
    const title = row.original.building.street + " " + row.original.building.houseNr + " " + row.original.building.zipCode + " " + row.original.building.city;
    //console.log(row.original._id);
    ReactDOM.render(<EditDialog
        title={"Bearbeiten: " + title}
        inputFieldValue={row.original._id} />,
        document.getElementById("portal"));
}