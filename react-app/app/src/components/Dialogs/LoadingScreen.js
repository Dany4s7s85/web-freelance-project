import React from 'react';
import {OverlayDialog} from './OverlayDialogFrame.js'

export const LoadingScreen = (props)=>
{
    let content = (
        <div>
            <h1>{props.title}</h1>
            <img src="loader.png" alt='laden...' style={{height: '80px'}}/>
        </div>);

    return (
    <OverlayDialog width={800} height={220} measure="px" isVisible={true} hideButton={true} showCloseButton={false} closeMaskOnClick={false}>
        {content}
    </OverlayDialog>);
}