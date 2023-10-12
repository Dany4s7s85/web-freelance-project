import React, { useState, useEffect } from "react";
import { Table } from "./components/Table.js";
import { pullData } from "./components/Utils/RESTHelper.js";

function App() {
  return <div>{LoadTable()}</div>;
}

function LoadTable() {
  const [state, setState] = useState({
    result: [],
    pageCount: 0,
    total: 0,
  });

  function fetchData({ pageIndex, pageSize, filter }) {
    pullData(
      {
        url: process.env.REACT_APP_URL_PULL_DATA,
        pageIndex,
        pageSize,
        filter: filter.filterData,
      },
      setState
    );
  }

  return (
    <Table
      data={state.result}
      fetchData={fetchData}
      total={state.total}
      pageCount={state.pageCount}
    />
  );
}

export default App;
