import React, { Fragment, useState, useEffect } from "react";

import "../../style/table/table.css";
import "../../style/table/pagination.css";

import Datatable from "./Datatable/Datatable";

// require("es6-promise").polyfill();
// require("isomorphic-fetch");

const Table = ({ d, callBackTable }) => {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/comments")
    //   .then((response) => response.json())
    //   .then((json) => setData(json));

    if (d) {
      setData(d);
    }

    // setData(d);
    // console.log(d);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   console.log("dddd:", d);
  // const search1 = (rows) => {
  //   //   SEARCH ONLY SPECIFIED COLUMNS
  //   return rows.filter(
  //     (row) =>
  //       row.email.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
  //       row.name.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
  //   );
  // };

  const search = (rows) => {
    //   OR YOU CAN SPECIFY EACH COLUMNS IN ARRAY
    // const columns = ["email", "name"];

    //   SEARCH ALL COLUMNS THAT COMES FROM JSON DATA
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  };

  const onTableId = (tableID) => {
    callBackTable(tableID);
  };

  return (
    <Fragment>
      <div className="table-search">
        <input
          className="table-search-input"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <Datatable
        data={search(data)}
        itemsPerPage={10}
        onTableId={(tableID) => onTableId(tableID)}
      />
    </Fragment>
  );
};

export default Table;
