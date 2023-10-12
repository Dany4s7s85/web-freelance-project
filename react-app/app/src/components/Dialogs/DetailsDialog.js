import React from 'react';
import dateFormat from "dateformat";
import {OverlayDialog} from './OverlayDialogFrame.js'

const DATE_FORMAT = "HH:MM:ss dd.mm.yyyy";

export const DetailsDialog = (props)=>
{
    let isValidDate = props.UploadDate !== "" && props.UploadDate !== undefined && props.UploadDate !== "Invalid Date" && !isNaN(props.UploadDate);
    let isUploaderValid = props.Uploader !== undefined && props.Uploader.replace(" ","") !== "";
    let content = (
        <div>
            <h1>{props.title}</h1>
            <div className="regular-text-container">
                <p className="regular-text">
                    <strong>Uploader:</strong> {isUploaderValid ? props.Uploader : "k.A."} <br/>
                    <strong>Hochgeladen:</strong> {isValidDate ? dateFormat(props.UploadDate, DATE_FORMAT) : "k.A."} 
                </p>
            </div>
        </div>);

    return (
    <OverlayDialog width={800} height={250} measure="px" isVisible={true} closeOnEsc={true}>
        {content}
    </OverlayDialog>);
}