import React, { Fragment, useEffect, useState } from "react";
// import PropTypes

import usePagination from "../Pagination/usePagination";

const Datatable = ({ data, itemsPerPage, startFrom, onTableId }) => {
  const [dateAsc, setDateAsc] = useState(false);
  const [estimateAsc, setEstimateAsc] = useState(false);

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
        // by default set date asc
        data.sort(function (a, b) {
          let partsA = a.date.split("-");
          let partsB = b.date.split("-");
          return (
            new Date(partsB[0], partsB[1] - 1, partsB[2]) -
            new Date(partsA[0], partsA[1] - 1, partsA[2])
          );
        });
        // end sort()
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

  const sortDate = (partsA, partsB, isASC) => {
    if (isASC) {
      return (
        new Date(partsA[0], partsA[1] - 1, partsA[2]) -
        new Date(partsB[0], partsB[1] - 1, partsB[2])
      );
    } else {
      return (
        new Date(partsB[0], partsB[1] - 1, partsB[2]) -
        new Date(partsA[0], partsA[1] - 1, partsA[2])
      );
    }
  };

  const onHeadingClick = (e) => {
    // sortTable(e.target.id);
    const head = e.target.id;

    data.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.

      let partsA;
      let partsB;

      if (head === "date") {
        partsA = a.date.split("-");
        partsB = b.date.split("-");

        return sortDate(partsA, partsB, dateAsc);
      }
      if (head === "estimate") {
        partsA = a.estimate.split("-");
        partsB = b.estimate.split("-");

        return sortDate(partsA, partsB, estimateAsc);
      }
    });

    if (head === "estimate") {
      if (estimateAsc) {
        setEstimateAsc(!estimateAsc);
      } else {
        setEstimateAsc(!estimateAsc);
      }
    }
    if (head === "date") {
      if (dateAsc) {
        setDateAsc(!dateAsc);
      } else {
        setDateAsc(!dateAsc);
      }
    }
    getInitialData();
  };

  return (
    <Fragment>
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            {data[0] &&
              // columns.map((heading, index) => <th key={index}>{heading}</th>)}
              columns.map((heading, index) =>
                heading === "id" ? null : (
                  <th
                    onClick={(e) => onHeadingClick(e)}
                    key={index}
                    id={heading}
                  >
                    {heading}
                  </th>
                )
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
