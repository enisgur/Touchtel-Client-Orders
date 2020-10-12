import React, { Fragment, useEffect } from "react";
// import PropTypes

import usePagination from "../Pagination/usePagination";

const Datatable = ({ data, itemsPerPage, startFrom, onTableId }) => {
  const {
    slicedData,
    pagination,
    prevPage,
    nextPage,
    changePage,
    getInitialData,
  } = usePagination({ data, itemsPerPage, startFrom });

  const columns = data[0] && Object.keys(data[0]);

  useEffect(() => {
    const init = async () => {
      if (data) {
        // console.log("initiallll ll l l", data);
        await getInitialData();
      }
    };
    init();
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const onDetail = (e) => {
    e.preventDefault();
    // console.log(e.target.id);
    onTableId(e.target.id);
  };

  return (
    <Fragment>
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            {data[0] &&
              // columns.map((heading, index) => <th key={index}>{heading}</th>)}
              columns.map((heading, index) =>
                heading === "id" ? null : <th key={index}>{heading}</th>
              )}
          </tr>
        </thead>
        <tbody>
          {slicedData[0] && data[0]
            ? slicedData.map((row, rI) => (
                <tr key={rI}>
                  {columns.map((column, cI) =>
                    // <td key={cI}>{row[column]}</td>
                    cI === 0 ? null : <td key={cI}>{row[column]}</td>
                  )}
                  <td>
                    <button
                      className="btn-details"
                      onClick={(e) => onDetail(e)}
                      id={row.id}
                    >
                      details
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <div className="pagination">
        <div className="next-prev">
          <a href="/#" className="pagination-previous" onClick={prevPage}>
            Previous
          </a>
          <a href="/#" className="pagination-next" onClick={nextPage}>
            Next
          </a>
        </div>
        <div className="pages">
          <ul className="pagination-list">
            {pagination.map((page) => {
              if (!page.ellipsis) {
                return (
                  <li key={page.id}>
                    <a
                      href="/#"
                      className={
                        page.current
                          ? "pagination-link is-current"
                          : "pagination-link"
                      }
                      onClick={(e) => changePage(page.id, e)}
                    >
                      {page.id}
                    </a>
                  </li>
                );
              } else {
                return (
                  <li key={page.id}>
                    <span className="pagination-ellipsis">&hellip;</span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Datatable;
