import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import Checkbox from "../Checkbox/Checkbox";
import { getUniqueData } from "../Utils/RESTHelper";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";

import "./TableFilter.css";

const TableFilter = (data) => {
  const {
    searchData,
    setSearchData,
    setDisplayFilter,
    setFilterData,
    filterData,
  } = data;
  let ColumnName = localStorage.getItem("ColumnName");
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      value: value,
      column: ColumnName,
    }));
  };

  const getFilter = () => {
    const data = {
      column: ColumnName,
      value: searchData,
    };

    // REACT_APP_URL_GET_FILTER
    getUniqueData(process.env.REACT_APP_URL_GET_FILTER, data)
      .then((res) => setDropdownOptions(res.data))
      .catch((err) => {
        console.log("err ::", err);
      });
  };

  // getUniqueData
  useEffect(() => {
    if (ColumnName) {
      getFilter();
    }
  }, [ColumnName, searchData, filterData]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setDisplayFilter(false);
        setSearchData((prev) => ({
          value: "",
          column: "",
        }));
      }}
    >
      <div id="filterId" className="container-main">
        <div className="input-main">
          <span className="icon">
            <BsSearch />
          </span>
          <input
            type="search"
            placeholder="Search..."
            name="search"
            value={searchData}
            onChange={handleChange}
          />
        </div>
        {/* 1st */}

        {dropdownOptions &&
          dropdownOptions.map((title) => (
            <div key={title} className="container-one">
              <Checkbox
                title={title}
                searchData={searchData}
                setSearchData={setSearchData}
                ColumnName={ColumnName}
                setFilterData={setFilterData}
                filterData={filterData}
              />
            </div>
          ))}
      </div>
    </OutsideClickHandler>
  );
};

export default TableFilter;
