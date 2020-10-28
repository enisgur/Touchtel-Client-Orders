import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import {
  deleteAccessory,
  postAccessory,
  getAccessoriesbyMonth,
} from "../../../actions/accessory";
import { getSuppliers } from "../../../actions/supplier";
import { getCarriers } from "../../../actions/carrier";
import { getDevices } from "../../../actions/device";
import { getTypes } from "../../../actions/type";

// css
import "../../../style/part.css";

// Components
import NewAccessory from "./NewAccessory/NewAccessory";
import DetailModal from "./Detail/DetailModal";
import Table from "../../Table/Table";

// Utils Functions
import {
  searchFuncAccessory,
  getAccessoriesbyDate,
} from "./../../utils/tableFuncs";

const Accessories = ({
  isAuth,
  user,
  accessories,
  postAccessory,
  deleteAccessory,
  getAccessoriesbyMonth,
  getSuppliers,
  suppliers,
  getDevices,
  devices,
  getCarriers,
  carriers,
  getTypes,
  types,
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

  const [isModal, setIsModal] = useState(false);
  const [dataAccessories, setDataAccessories] = useState([]);
  const [componentLoading, setComponentLoading] = useState(true);

  // Accessories Detail Modal
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
    getDevices();
    getTypes();
    setDate();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (year && month) {
      setStatus(0);
      setIsStatusFiltered(false);
      setFilterStatusData([]);
      getAccessoriesbyDate(
        year,
        month,
        { setComponentLoading, setDataAccessories },
        { getAccessoriesbyMonth }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  useEffect(() => {
    if (status) {
      // when status change filter parts by selected Status
      // change dataParts setDataParts  State !
      const initEffect = async () => {
        await searchFuncAccessory(status, accessories, {
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
    await postAccessory(formdata);
    // await getPartsbyDate(year, month);
    getAccessoriesbyDate(
      year,
      month,
      { setComponentLoading, setDataAccessories },
      { getAccessoriesbyMonth }
    );
  };

  const onModalDelete = async (mId) => {
    await deleteAccessory(mId);

    getAccessoriesbyDate(
      year,
      month,
      { setComponentLoading, setDataAccessories },
      { getAccessoriesbyMonth }
    );
  };

  const callBackTable = (tableid) => {
    async function filterAccessory(tableid) {
      const accessory = await accessories.filter(function (accesso) {
        return accesso._id === tableid;
      });

      // console.log(part);
      setClickedTable(accessory);
    }

    if (tableid) {
      filterAccessory(tableid);

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
        <NewAccessory
          user={user}
          suppliers={suppliers && suppliers.suppliers}
          carriers={carriers && carriers.carriers}
          devices={devices && devices.devices}
          types={types && types.types}
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
          devices={devices && devices.devices}
          types={types && types.types}
          modalState={isDetailModal}
          onClose={() => setIsDetailModal(false)}
          onModalSubmit={(formdata) => onModalSubmit(formdata)}
          onModalDelete={(mId) => onModalDelete(mId)}
        />
      )}

      <div className="title">
        <h2>Accessories</h2>
        <span>Find all customer or store Accessory orders</span>
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

      {componentLoading === false && dataAccessories.length > 0 ? (
        <Table
          d={isStatusFiltered ? filterStatusData : dataAccessories}
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

Accessories.propTypes = {
  // loadUser: PropTypes.func.isRequired,
  // getParts: PropTypes.func.isRequired,
  getAccessoriesbyMonth: PropTypes.func.isRequired,
  postAccessory: PropTypes.func.isRequired,
  deleteAccessory: PropTypes.func.isRequired,
  user: PropTypes.object,
  accessories: PropTypes.array,
  isAuth: PropTypes.bool,
  getSuppliers: PropTypes.func.isRequired,
  getCarriers: PropTypes.func.isRequired,
  getDevices: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  accessories: state.accessories.accessories,
  isAuth: state.auth.isAuthenticated,
  suppliers: state.suppliers,
  carriers: state.carriers,
  devices: state.devices,
  types: state.types,
});

export default connect(mapStateToProps, {
  getSuppliers,
  getCarriers,
  getDevices,
  getTypes,
  postAccessory,
  getAccessoriesbyMonth,
  deleteAccessory,
})(Accessories);
