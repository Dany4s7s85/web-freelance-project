import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {DateDialogContent} from '../Dialogs/DateDialog.js';
import {postData} from './../Utils/RESTHelper.js'


export const ChangeDateDialogButtons = (row) =>
{
    var validFromvalue = row.original.building.validFrom;
    var validUntilvalue = row.original.building.validUntil;
    let isValueEmpty = validFromvalue === undefined || validFromvalue === null || validFromvalue === "";
    validFromvalue = isValueEmpty ? "ändern" : validFromvalue;
    isValueEmpty = validUntilvalue === undefined || validUntilvalue === null || validUntilvalue === "";
    validUntilvalue = isValueEmpty ? "ändern" : validUntilvalue;

    const [currentFromlValue, setCurrentFromValue] = useState(validFromvalue);
    const [currentUntilValue, setCurrentUntilValue] = useState(validUntilvalue);
    function setCellValues(newValidFromValue, newValidUntilValue)
    {
        setCurrentFromValue(newValidFromValue);
        setCurrentUntilValue(newValidUntilValue);
        row.original.building.validFrom = newValidFromValue;
        row.original.building.validUntil = newValidUntilValue;
    }

    return (
    <div className="multi-element-container">
        <button className="cell-button" onClick={() => {OpenDateDialog(row, setCellValues)}}>{currentFromlValue}</button>
        <button className="cell-button" onClick={() => {OpenDateDialog(row, setCellValues)}}>{currentUntilValue}</button>
    </div>)
}

export const ChangeDateDialogButtonValidFrom = (row) =>
{
    var validFromvalue = row.original.building.validFrom;
    let isValueEmpty = validFromvalue === undefined || validFromvalue === null || validFromvalue === "";
    validFromvalue = isValueEmpty ? "ändern" : validFromvalue;
    
    const [currentFromValue, setCurrentFromValue] = useState(validFromvalue);

    function setCellValues(newValidFromValue, newValidUntilValue)
    {
        setCurrentFromValue(newValidFromValue);
        row.original.building.validFrom = newValidFromValue;
        row.original.building.validUntil = newValidUntilValue;
        ReactDOM.render(newValidUntilValue, document.getElementById("cell-button-valid-until-container-"+row.index));
    }

    return (<button className="cell-button" id={"cell-button-valid-from-container-"+row.index} onClick={() => {OpenDateDialog(row, setCellValues)}}>{currentFromValue}</button>);
}

export const ChangeDateDialogButtonValidUntil = (row) =>
{
    var validUntilValue = row.original.building.validUntil;
    let isValueEmpty = validUntilValue === undefined || validUntilValue === null || validUntilValue === "";
    validUntilValue = isValueEmpty ? "ändern" : validUntilValue;

    const [currentUntilValue, setCurrentUntilValue] = useState(validUntilValue);

    function setCellValues(newValidFromValue, newValidUntilValue)
    {
        setCurrentUntilValue(newValidUntilValue);
        row.original.building.validFrom = newValidFromValue;
        row.original.building.validUntil = newValidUntilValue;
        ReactDOM.render(newValidFromValue, document.getElementById("cell-button-valid-from-container-"+row.index));
    }

    return (<button className="cell-button" id={"cell-button-valid-until-container-"+row.index} onClick={() => {OpenDateDialog(row, setCellValues)}}>{currentUntilValue}</button>);
}

function OpenDateDialog(row, updateValueCallback)
{
    const title = row.original.building.street + " " + row.original.building.houseNr + " " + row.original.building.zipCode + " " + row.original.building.city;
    const id = row.original._id;
    const validFrom = row.original.building.validFrom;
    const validUntil = row.original.building.validUntil;

    if(id === undefined || id === '')
    {
        console.error("ID-Nullpointer");
        return;
    }

    ReactDOM.render(<DateDialogContent
        title={title}
        id={id}
        validFrom={validFrom}
        validUntil={validUntil}
        isVisible={true}
        onCloseCallback={(id, startDate, endDate) => {OnDateDialogClose(id, startDate, endDate, updateValueCallback)}}/>,
        document.getElementById("portal"));
}

function OnDateDialogClose(id, startDate, endDate, updateValueCallback)
{
    const dataToUpdate =
    {
        id: id,
        building:
        {
            validFrom: startDate,
            validUntil: endDate
        }
    }
    updateValueCallback(startDate, endDate);
    //console.log(dataToUpdate);
    postData(process.env.REACT_APP_URL_UPDATE_DB, dataToUpdate);
}