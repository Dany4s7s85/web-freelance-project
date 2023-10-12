import React, { useState } from "react";
import "../Checkbox/Checkbox.css";
import "./Checkbox.css";

const Checkbox = ({
  title,
  ColumnName,
  setFilterData,
  filterData,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = (title) => {
    setIsChecked((prev) => !prev);
    if (!isChecked) {
      setFilterData((prev) => ({
        column: ColumnName,
        value:[...prev.value, title],
      }));
    } else {
     const result = filterData.value.filter((item) => {
        return item !== title
      })
      setFilterData((prev) => ({
        ...prev,
        value: [...result],
      }));
    }
  };

  return (
    <>
      <div className="check-main">
        <div className="container" onClick={() => handleClick(title)}>
          {/* <input type="radio" value={title} checked={searchData == title} /> */}
          <input type="checkbox" checked={filterData.value.includes(title) &&  true}  />
          <span className="checkmark"></span>
          <div className="text-content">{title}</div>
        </div>
      </div>
    </>
  );
};

export default Checkbox;
