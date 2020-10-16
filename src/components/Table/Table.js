import React, { Fragment, useState, useEffect } from "react";

import "../../style/table/table.css";
import "../../style/table/pagination.css";

import Datatable from "./Datatable/Datatable";

// require("es6-promise").polyfill();
// require("isomorphic-fetch");

const Table = ({ d, callBackTable }) => {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // const [filteredData, setFilteredData] = useState([]);
  // const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (d) {
      setData(d);
      setFilteredData(d);
    }

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

  useEffect(() => {
    const search = (rows) => {
      //   OR YOU CAN SPECIFY EACH COLUMNS IN ARRAY
      // const columns = ["email", "name"];
      if (rows) {
        //   SEARCH ALL COLUMNS THAT COMES FROM JSON DATA
        const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) =>
          columns.some(
            (column) =>
              row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          )
        );
      }
    };
    if (data[0]) {
      setFilteredData(search(data));
      // setData(data)
    }
  }, [q, data]);

  const onTableId = (tableID) => {
    tableID && callBackTable(tableID);
  };

  const handleQuery = (e) => {
    e.preventDefault();
    setQ(e.target.value);
    setIsFiltered(true);
  };

  return (
    <Fragment>
      <div className="table-search">
        <input
          className="table-search-input"
          type="text"
          value={q}
          onChange={(e) => handleQuery(e)}
          placeholder="Search..."
        />
      </div>
      <Datatable
        data={isFiltered ? filteredData : data}
        itemsPerPage={10}
        onTableId={(tableID) => onTableId(tableID)}
      />
    </Fragment>
  );
};

export default Table;
