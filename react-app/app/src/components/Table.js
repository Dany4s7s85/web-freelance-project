import { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useRowSelect } from "react-table";
import ReactDOM from 'react-dom';

import { columnsSchema } from "./columns.js";
import { ExportDropdown } from "./ExportDropdown.js";
import { exportFiles } from "./Utils/ExportHelper.js";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox.js";
import { LoadingScreen } from './Dialogs/LoadingScreen.js'

import { RiFilter2Fill } from "react-icons/ri";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";

import './styleSheets/table.css';

import TableFilter from "./TableFilter/TableFilter";

export function Table({
  data,
  fetchData,
  total,
  pageCount: controlledPageCount,
}) {
  const buildings = data;

  const columns = useMemo(() => columnsSchema, []);
  const rowData = useMemo(() => buildings, [buildings]);
  const [searchData, setSearchData] = useState({ column: "", value: "" });
  const [filterData, setFilterData] = useState({ column: "", value: [] });
  const [displayFilter, setDisplayFilter] = useState(false);
  const exportOptions = [
    { key: "csv", value: "CSV" },
    { key: "pdf1", value: "PDF - mit Maßen" },
    { key: "pdf0", value: "PDF - ohne Maßen" },
  ];

const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    selectedFlatRows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data: rowData,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: false,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  useEffect(() => {
    fetchData({
      pageIndex,
      pageSize,
      filter: { filterData },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, filterData, filterData.column, filterData.value]);


    function confirm(selectedKeys)
    {
        ShowLoadingScreen();
        var exportIDs = [];
        selectedFlatRows.forEach(sfr =>
        {
            if(selectedKeys.includes('csv'))
                exportIDs.push(sfr.original.files.csv_id)
            if(selectedKeys.includes('pdf1'))
                exportIDs.push(sfr.original.files.floorplan_1_id)
            if(selectedKeys.includes('pdf0'))
                exportIDs.push(sfr.original.files.floorplan_0_id)
        });
        exportFiles(exportIDs, process.env.REACT_APP_URL_DOWNLOAD_FILE, () => HideLoadingScreen());
    }

  const opentFilter = (header) => {
    var element = document.getElementById("demo");
    element.style.position = "absolute";
    element.style.left = header.clientX+ "px";
    element.style.top = "29.9px";
    element.style.Zindex = "5px solid black";
    element.style.width = "142px";
    element.style.display = "block !important";

    return (
      <TableFilter
        setSearchData={setSearchData}
        searchData={searchData.value}
        setDisplayFilter={setDisplayFilter}
        setFilterData={setFilterData}
        filterData={filterData}
      />
    );
  };
  const showFilter = (e, header, accessor) => {
    e.stopPropagation();
    console.log(e.target.parentElement.parentElement.parentElement);
    document.getElementsByClassName("container-main");
    console.log(document.getElementById("filterId"));
    localStorage.setItem("ColumnName", accessor);
    setDisplayFilter(!displayFilter);
    opentFilter(e, header);
  };
  return (
    <div>
      <div className="export-dropdown-container">
        <ExportDropdown dropdownOptions={exportOptions} onConfirm={confirm} />
      </div>
      <div className="show-main">
        <div className="show-text">Show</div>
        <select
          id="mySelect"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[2, 5, 8, 10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <div className="show-text">entries</div>
      </div>
      <table className="position" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps({
                // style: {width: '2000px',color:"red !important"}
              })}
            >
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="main-content">
                    <div className="sorting-btns">
                      {column.render("Header")}{" "}
                      {!displayFilter && column.isSorted && (
                        <div>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <div className="up-icon">
                                <FaSortAlphaUpAlt />
                              </div>
                            ) : (
                              <div className="down-icon">
                                <FaSortAlphaDown />
                              </div>
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    </div>
                    <>
                      <div
                        className="filter-icon"
                        onClick={(e) => showFilter(e, column.Header, column.id)}
                      >
                        <>{column.isButton && <RiFilter2Fill />}</>
                      </div>
                    </>
                  </div>
                </th>
              ))}
              <td id="demo">
                {displayFilter && (
                  <TableFilter
                    setSearchData={setSearchData}
                    searchData={searchData.value}
                    setDisplayFilter={setDisplayFilter}
                    setFilterData={setFilterData}
                    filterData={filterData}
                  />
                )}
              </td>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div className="bottom-content">
        <div className="show-entries">
          Showing {pageSize * pageIndex} to {pageSize * pageIndex + pageSize} of{" "}
          {total} entries
        </div>
        {/* old cod for with0ut react-icons*/}
        <div className="Box-main">
          <div
            className="Box-content"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </div>
          <div
            className="Box-content"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </div>
          <div
            className="Box-content"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </div>
          <div
            className="Box-content"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </div>
          <span className="paginaition-text">
            Page{" "}
            <strong className="countig-content">
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span className="paginaition-text">
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
        </div>
        {/* <div className="Box-main">
          <div
            className="Box-content"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <FaAngleDoubleLeft />
          </div>
          <div
            className="Box-content"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <FaAngleLeft />
          </div>
          <div
            className="Box-content"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <FaAngleRight />
          </div>
          <div
            className="Box-content"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <FaAngleDoubleRight />
          </div>
          <span className="paginaition-text">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span className="paginaition-text">
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
              className="paginaition-text"
            />
          </span>{" "}
        </div> */}
      </div>
    </div>

    )
}

function ShowLoadingScreen()
{
    ReactDOM.render(<LoadingScreen title="Download gestartet.." />, document.getElementById("portal"));
}

function HideLoadingScreen()
{
    ReactDOM.render(null, document.getElementById("portal"));
}
