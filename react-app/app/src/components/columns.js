import React from "react";

import { downloadFileWithURl} from './Utils/ExportHelper';

import { EditDialogButton } from './columnButtons/EditDialogButton.js';
import { DetailsDialogButton } from './columnButtons/DetailsDialogButton.js';
import { ChangeDateDialogButtonValidFrom, ChangeDateDialogButtonValidUntil } from './columnButtons/ChangeDateDialogButtons.js';

export const columnsSchema = [
  {
    Header: "Buchungskreis",
    isButton: true,
    accessor: "building.companyCode",
  },
  {
    Header: "Wirtschaftseinheit",
    isButton: true,
    accessor: "building.businessEntity",
  },
  {
    Header: "Gebäude-ID",
    accessor: "building.buildingID",
    isButton: true,
  },
  {
    Header: "PLZ",
    isButton: true,
    accessor: "building.zipCode",
  },
  {
    Header: "Ort",
    isButton: true,
    accessor: "building.city",
  },
  {
    Header: "Str",
    isButton: true,
    isfill: true,
    accessor: "building.street",
  },
  {
    Header: "Hausnr",
    isButton: true,
    accessor: "building.houseNr",
  },
  {
    Header: "Details",
    accessor: "",
    Cell: ({row}) =>(DetailsDialogButton(row))
  },
  {
    isButton: true,
    Header: "Gültig von",
    accessor: "building.validFrom",
    Cell: ({ row }) => ChangeDateDialogButtonValidFrom(row),
  },
  {
    isButton: true,
    Header: "Gültig bis",
    accessor: "building.validUntil",
    Cell: ({ row }) => ChangeDateDialogButtonValidUntil(row),
  },
  {
    Header: "Bearbeiten",
    accessor: "",
	  Cell: ({row}) =>(EditDialogButton(row))
  },
  {
    Header: "Grundriss 0",
    accessor: "files.floorplan_0_id",
    Cell: ({ value }) => downloadLinkComponent(value),
  },
  {
    Header: "Grundriss 1",
    accessor: "files.floorplan_1_id",
    Cell: ({ value }) => downloadLinkComponent(value),
  },
  {
    Header: 'CSV',
    accessor: 'files.csv_id',
    Cell: ({value}) =>(downloadCSVLinkComponent(value))
}
];

function downloadLinkComponent(value) {
  return (
    <a
      className="cell-button"
      href={process.env.REACT_APP_URL_DOWNLOAD_FILE + value}
      target="_blank"
      rel="noopener noreferrer"
    >
      Download
    </a>
  );
}

function downloadCSVLinkComponent(value)
{
    return (<a className="cell-button"  onClick={() => downloadFileWithURl(process.env.REACT_APP_URL_DOWNLOAD_FILE+value, "GebäudeInformationen.csv")}>Download</a>)
}
