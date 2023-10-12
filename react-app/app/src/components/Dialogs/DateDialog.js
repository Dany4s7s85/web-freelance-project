import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";
import {OverlayDialog} from './OverlayDialogFrame.js'
import "react-datepicker/dist/react-datepicker.css";
import './../styleSheets/./DialogContentsStyle.css';

const DATE_FORMAT_DATEPICKER = "yyyy-MM-dd";
const DATE_FORMAT_RESULT = "yyyy-mm-dd";

export const DateDialogContent = (props)=>
{
    const currentStartDate = props.validFrom === undefined || props.validFrom === '' || props.validFrom === null ? new Date() : new Date(props.validFrom);
    const currentEndDate = props.validUntil === undefined || props.validUntil === '' || props.validUntil === null ? new Date() : new Date(props.validUntil);

    const [startDate, setStartDate] = useState(currentStartDate);
    const [endDate, setEndDate] = useState(currentEndDate);

    let content = (
        <div>
            <h1>Gültigkeitsdatum: {props.title}</h1>
            <div className="datePickerContainer">
                <div className="datePicker">
                    <h5 className="date-picker-title">Gültig von:</h5>
                    <DatePicker dateFormat={DATE_FORMAT_DATEPICKER} selected={startDate} onChange={(date) => setStartDate(date)}/>
                </div>
                <div className="datePicker">
                    <h5 className="date-picker-title">Gültig bis:</h5>
                    <DatePicker dateFormat={DATE_FORMAT_DATEPICKER} selected={endDate} onChange={(date) => setEndDate(date)}/>
                </div>
            </div>
        </div>);

    return (
    <OverlayDialog width={900} height={450} measure="px" isVisible={true} closeOnEsc={true} onCloseCallback={() => props.onCloseCallback(props.id, dateFormat(startDate, DATE_FORMAT_RESULT), dateFormat(endDate, DATE_FORMAT_RESULT))}>
        {content}
    </OverlayDialog>);
}
