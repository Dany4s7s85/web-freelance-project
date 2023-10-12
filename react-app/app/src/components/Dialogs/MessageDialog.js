import React from 'react';
import {OverlayDialog} from './OverlayDialogFrame.js'

export const MessageDialog = (props)=>
{
    let content = (
        <div>
            <h1>{props.title}</h1>
            {props.content}
        </div>);

    return (
    <OverlayDialog width={800} height={400} measure="px" isVisible={true}>
        {content}
    </OverlayDialog>);
}