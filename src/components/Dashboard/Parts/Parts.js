import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postPart, getParts } from "../../../actions/part";
import { loadUser } from "../../../actions/auth";

import "../../../style/part.css";

import NewPart from "./NewPart/NewPart";
import DetailModal from "./Detail/DetailModal";
import Table from "../../Table/Table";

const Parts = ({ isAuth, user, parts, postPart, getParts, loadUser }) => {
  const history = useHistory();

  useEffect(() => {
    async function load() {
      await loadUser();
      if (!isAuth) {
        return history.push("/login");
        // return <Redirect to="/login" />;
        // return null;
      }
    }

    load();
  }, []);

  const [isModal, setIsModal] = useState(false);
  const [dataParts, setDataParts] = useState([]);
  const [componentLoading, setComponentLoading] = useState(true);

  // Parts Detail Modal
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [clickedTable, setClickedTable] = useState("");

  async function getallparts() {
    // console.log("start");
    setComponentLoading(true);
    setDataParts([]);

    const res = await getParts();
    // setDataParts(res);

    await res.map((p) => {
      // let newObj = {
      //   ...p.shipping,
      //   ...p.detail,
      //   ...p.finance,
      //   ...p.customer,
      //   ...p.user,
      //   isStore: p.isStore,
      // };

      let newObj = {
        id: p._id,
        date: p.date ? p.date.split("T")[0] : "",
        estimate: p.shipping.edate ? p.shipping.edate.split("T")[0] : "",
        from: p.detail.supplier ? p.detail.supplier : "",
        device: p.detail.device ? p.detail.device : "",
        model: p.detail.model ? p.detail.model : "",
        part: p.detail.part ? p.detail.part : "",
        customer: p.customer.name ? p.customer.name : "",
        phone: p.customer.phone ? p.customer.phone : "",
      };

      setDataParts((f) => [...f, newObj]);
      // console.log(newObj);
      return newObj;
    });

    // console.log("done");
    setComponentLoading(false);
  }

  useEffect(() => {
    getallparts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  // detail modal
  const toggleDetailModal = () => {
    setIsDetailModal(!isDetailModal);
  };

  const onModalSubmit = async (formdata) => {
    console.log("modalSubmited !!", formdata);
    await postPart(formdata);
    await getallparts();
  };

  const callBackTable = (tableid) => {
    async function filterPart(tableid) {
      const part = await parts.filter(function (part) {
        return part._id === tableid;
      });

      console.log(part);
      setClickedTable(part);
    }

    filterPart(tableid);

    toggleDetailModal();
  };
  return (
    <div className="parts-main">
      <NewPart
        user={user}
        modalState={isModal}
        onClose={() => setIsModal(false)}
        onModalSubmit={(formdata) => onModalSubmit(formdata)}
      />
      <DetailModal
        p={clickedTable ? clickedTable : null}
        modalState={isDetailModal}
        onClose={() => setIsDetailModal(false)}
      />
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

      {/* TABLE BELLOW */}
      {/* {parts ? <Table d={parts} /> : <div>Loading...</div>} */}

      {/* {dataParts.length > 1 ? <Table d={dataParts} /> : <div>Loading..</div>} */}

      {/* {dataParts.length > 1 ? <Table d={dataParts} /> : <div>NO</div>} */}
      {/* <Table /> */}

      {componentLoading === false && dataParts.length > 0 ? (
        <Table
          d={dataParts}
          callBackTable={(tableID) => callBackTable(tableID)}
        />
      ) : (
        <div>NO DATA...</div>
      )}

      {/* <Modal modalState={isModal} onClose={() => setIsModal(false)}>
        <h1>hello</h1>
        <p>nabererere</p>
      </Modal> */}
    </div>
  );
};

Parts.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getParts: PropTypes.func.isRequired,
  postPart: PropTypes.func.isRequired,
  user: PropTypes.object,
  parts: PropTypes.array,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  parts: state.part.parts,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { postPart, getParts, loadUser })(
  Parts
);

// https://www.youtube.com/watch?v=LyLa7dU5tp8&ab_channel=WebDevSimplified
