import React from 'react';
import ReactDOM from 'react-dom';
import { DetailsDialog } from './../Dialogs/DetailsDialog.js';

export function DetailsDialogButton(row)
{
    return (
        <button className="cell-button" onClick={() => {OpenDetailsDialog(row)}}>Details</button>
    );   
}

function OpenDetailsDialog(row)
{
    const title = row.original.building.street + " " + row.original.building.houseNr + " " + row.original.building.zipCode + " " + row.original.building.city;
    var uploader = "";
    var uploadDate = "";
    if(row.original.info === undefined)
    {
        uploader = "";
        uploadDate = "";
    }
    else
    {
        uploader = row.original.info.bauleiter === undefined ? "" : row.original.info.bauleiter;
        uploadDate = row.original.info.uploadDate === undefined ? undefined : new Date(parseInt(row.original.info.uploadDate));
    }
    
    //console.log(row.original._id);
    ReactDOM.render(<DetailsDialog
        title={"Details: " + title}
        Uploader={uploader}
        UploadDate={uploadDate}/>,
        document.getElementById("portal"));
}