import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { postPart, getPartsbyMonth } from "../../../actions/part";
import { getSuppliers } from "../../../actions/supplier";
import { getCarriers } from "../../../actions/carrier";
// import { loadUser } from "../../../actions/auth";

// css
import "../../../style/part.css";

// Components
import NewPart from "./NewPart/NewPart";
import DetailModal from "./Detail/DetailModal";
import Table from "../../Table/Table";

// Utils Functions
import { searchFunc, getPartsbyDate } from "./../../utils/tableFuncs";
// import carriers from "../../../reducers/carriers";

const Parts = ({
  isAuth,
  user,
  parts,
  postPart,
  // getParts,
  getPartsbyMonth,
  getSuppliers,
  suppliers,
  getCarriers,
  carriers,
  // loadUser,
}) => {
  const history = useHistory();

  useEffect(() => {
    function load() {
      // await loadUser();
      if (!isAuth) {
        return history.push("/login");
      }
    }

    load();

    // eslint-disable-next-line
  }, [isAuth]);

  // const [isMounted, setIsMounted] = useState(false);

  const [isModal, setIsModal] = useState(false);
  const [dataParts, setDataParts] = useState([]);
  const [componentLoading, setComponentLoading] = useState(true);

  // Parts Detail Modal
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [clickedTable, setClickedTable] = useState("");

  const [status, setStatus] = useState(0);
  const [slctStatus] = useState(["All", "Ordered", "Shipped", "Done"]);
  const [filterStatusData, setFilterStatusData] = useState([]);
  const [isStatusFiltered, setIsStatusFiltered] = useState(false);

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [slctYears] = useState([2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  const [slctMonth] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  useEffect(() => {
    async function setDate() {
      setYear(new Date().getFullYear());
      setMonth(new Date().getMonth() + 1);
    }

    getCarriers();
    getSuppliers();
    setDate();
    // eslint-disable-next-line
  }, []);

  // GETPARTSBYDATE WAS HERE <-----------------------

  useEffect(() => {
    if (year && month) {
      setStatus(0);
      setIsStatusFiltered(false);
      setFilterStatusData([]);
      getPartsbyDate(
        year,
        month,
        { setComponentLoading, setDataParts },
        { getPartsbyMonth }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  useEffect(() => {
    if (status) {
      // when status change filter parts by selected Status
      // change dataParts setDataParts  State !
      const initEffect = async () => {
        await searchFunc(status, parts, {
          setComponentLoading,
          setFilterStatusData,
          setIsStatusFiltered,
        });
      };

      initEffect();
      // console.log(filterStatusData);

      // filterPart(status);
    }
    // eslint-disable-next-line
  }, [status]);

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  // detail modal
  const toggleDetailModal = () => {
    setIsDetailModal(!isDetailModal);
  };

  const onModalSubmit = async (formdata) => {
    // console.log("modalSubmited !!", formdata);
    await postPart(formdata);
    // await getPartsbyDate(year, month);
    getPartsbyDate(
      year,
      month,
      { setComponentLoading, setDataParts },
      { getPartsbyMonth }
    );
  };

  const callBackTable = (tableid) => {
    async function filterPart(tableid) {
      const part = await parts.filter(function (part) {
        return part._id === tableid;
      });

      // console.log(part);
      setClickedTable(part);
    }

    if (tableid) {
      filterPart(tableid);

      toggleDetailModal();
    }
  };

  const handleSelectInput = (e) => {
    e.preventDefault();
    if (e.target.id === "year") {
      setYear(e.target.value);
    }
    if (e.target.id === "month") {
      setMonth(e.target.value);
    }
    if (e.target.id === "status") {
      // console.log(e.target.value);
      setStatus(e.target.value);
    }
  };
  return (
    <div className="parts-main">
      {isModal && (
        <NewPart
          user={user}
          suppliers={suppliers && suppliers.suppliers}
          carriers={carriers && carriers.carriers}
          modalState={isModal}
          onClose={() => setIsModal(false)}
          onModalSubmit={(formdata) => onModalSubmit(formdata)}
        />
      )}

      {isDetailModal && (
        <DetailModal
          p={clickedTable ? clickedTable : null}
          suppliers={suppliers && suppliers.suppliers}
          carriers={carriers && carriers.carriers}
          modalState={isDetailModal}
          onClose={() => setIsDetailModal(false)}
          onModalSubmit={(formdata) => onModalSubmit(formdata)}
        />
      )}

      <div className="title">
        <h2>Parts</h2>
        <span>Find all customer or store Parts orders</span>
      </div>

      <div className="actions">
        <button
          className="btn-new"
          onClick={() => {
            toggleModal();
          }}
        >
          + New
        </button>
      </div>

      <div className="dates">
        <div className="selectes">
          <select
            name="year"
            id="year"
            className="selectDates"
            onChange={(e) => handleSelectInput(e)}
            value={year && year}
          >
            {year &&
              slctYears.map((y, i) => (
                <option value={y} key={i}>
                  {y}
                </option>
              ))}
          </select>

          <select
            name="month"
            id="month"
            className="selectDates"
            onChange={(e) => handleSelectInput(e)}
            value={month && month}
          >
            {month &&
              slctMonth.map((m, i) => (
                <option value={i + 1} key={i}>
                  {m}
                </option>
              ))}
          </select>

          <select
            name="status"
            id="status"
            className="selectDates"
            onChange={(e) => handleSelectInput(e)}
            value={status}
          >
            {slctStatus.map((s, i) => (
              <option value={i} key={i}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {componentLoading === false && dataParts.length > 0 ? (
        <Table
          d={isStatusFiltered ? filterStatusData : dataParts}
          callBackTable={(tableID) => callBackTable(tableID)}
        />
      ) : componentLoading ? (
        <div className="table-nodata">Loading ...</div>
      ) : (
        <div className="table-nodata">NO DATA...</div>
      )}
    </div>
  );
};

Parts.propTypes = {
  // loadUser: PropTypes.func.isRequired,
  // getParts: PropTypes.func.isRequired,
  getPartsbyMonth: PropTypes.func.isRequired,
  postPart: PropTypes.func.isRequired,
  user: PropTypes.object,
  parts: PropTypes.array,
  isAuth: PropTypes.bool,
  getSuppliers: PropTypes.func.isRequired,
  getCarriers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  parts: state.part.parts,
  isAuth: state.auth.isAuthenticated,
  suppliers: state.suppliers,
  carriers: state.carriers,
});

export default connect(mapStateToProps, {
  postPart,
  getSuppliers,
  getCarriers,
  // getParts,
  getPartsbyMonth,
  // loadUser,
})(Parts);

// https://www.youtube.com/watch?v=LyLa7dU5tp8&ab_channel=WebDevSimplified
