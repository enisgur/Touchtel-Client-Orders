import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";

import "../../../../style/newpart.css";
import "../../../../style/modal.css";

const formStyle = {
  width: "100%",
  textAlign: "center",
};

const DetailModal = ({ modalState, onClose, p }) => {
  // console.log(p && p[0]._id);

  const [formdata, setFormdata] = useState({
    user: "",
    date: "",
    edate: "",
    tracking: "",
    carrier: "",
    supplier: "",
    part: "",
    device: "",
    model: "",
    quantity: "0",
    cost: "0",
    deposit: "0",
    msrp: "0",
    isStore: false,
    name: "",
    phone: "",
    email: "",
    edit: false,
    id: "",
    status: null,
  });

  const {
    date,
    edate,
    tracking,
    carrier,
    supplier,
    part,
    device,
    model,
    quantity,
    cost,
    deposit,
    msrp,
    isStore,
    name,
    phone,
    email,
    status,
    edit,
  } = formdata;

  //   console.log("ccjcjasjcasc : ", formdata);

  useEffect(() => {
    //   if ()
    setFormdata((f) => {
      return {
        ...f,
        id: p && p[0]._id ? p[0]._id : "",
        user: "",
        date: p && p[0].date ? p[0].date.split("T")[0] : "",
        edate:
          p && p[0].shipping.edate ? p[0].shipping.edate.split("T")[0] : "",
        tracking: p && p[0].shipping.tracking ? p[0].shipping.tracking : "",
        carrier: p && p[0].shipping.carrier ? p[0].shipping.carrier : "",
        supplier: p && p[0].detail.supplier ? p[0].detail.supplier : "",
        part: p && p[0].detail.part ? p[0].detail.part : "",
        device: p && p[0].detail.device ? p[0].detail.device : "",
        model: p && p[0].detail.model ? p[0].detail.model : "",
        quantity: p && p[0].finance.quantity ? p[0].finance.quantity : "0",
        cost: p && p[0].finance.cost ? p[0].finance.cost : "0",
        deposit: p && p[0].finance.deposit ? p[0].finance.deposit : "0",
        msrp: p && p[0].finance.msrp ? p[0].finance.msrp : "0",
        isStore: p && p[0].isStore ? Boolean(p[0].isStore) : Boolean(false),
        name: p && p[0].customer.name ? p[0].customer.name : "",
        phone: p && p[0].customer.phone ? p[0].customer.phone : "",
        email: p && p[0].customer.email ? p[0].customer.email : "",
        status: p && p[0].status ? p[0].status : null,
      };
    });
  }, [p]);

  //   console.log(formdata);

  const clearForm = () => {
    setFormdata({
      ...formdata,
      id: "",
      date: "",
      edate: "",
      tracking: "",
      carrier: "",
      supplier: "",
      part: "",
      device: "",
      model: "",
      quantity: "0",
      cost: "0",
      deposit: "0",
      msrp: "0",
      isStore: false,
      name: "",
      phone: "",
      email: "",
      status: null,
    });
  };

  const onChane = (e) => {
    if (e.target.name === "isStore") {
      return isStore
        ? setFormdata({
            ...formdata,
            [e.target.name]: Boolean(false),
            name: "",
            phone: "",
            email: "",
          })
        : setFormdata({
            ...formdata,
            [e.target.name]: Boolean(true),
            name: "",
            phone: "",
            email: "",
          });
    }
    setFormdata({ ...formdata, [e.target.name]: e.target.value });

    // console.log(formdata);
  };

  // select all Text on focus of form input
  const handleFocus = (e) => e.target.select();

  const onSubmit = async (e) => {
    e.preventDefault();
    // await onModalSubmit(formdata);
    // clearForm();
  };

  const closeModal = () => {
    clearForm();
    onClose();
  };

  const toggleEdit = () => {
    setFormdata({
      ...formdata,
      edit: !edit,
    });
  };

  if (!modalState) return null;

  return ReactDom.createPortal(
    <div className={`modal modalShowing-${modalState}`}>
      <div className="modalInner">
        <div className={`${edit ? "status-form-on" : "status-form-off"}`}>
          <div className="stat">Edit ON</div>
        </div>
        <button className="modalClose" onClick={closeModal}>
          Close
        </button>
        {/* Content here */}
        <h1 style={formStyle}>Order Details</h1>

        <div className="status">
          {/* <div className="notordered">Not ordered</div> */}
          <div className={`${status >= 0 && "ready"}`}>onshipping</div>
          <div
            className={`${status === 0 ? "now" : status > 0 ? "ready" : ""}`}
          >
            Shipped
          </div>
          <div
            className={`${status === 1 ? "now" : status > 1 ? "ready" : ""}`}
          >
            Awaiting Customer
          </div>
          <div
            className={`${status === 2 ? "now" : status > 2 ? "ready" : ""}`}
          >
            Done
          </div>
        </div>

        <div className="action">
          <button className="btn-edit" onClick={() => toggleEdit()}>
            Edit
          </button>
        </div>

        <div className="myForm">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="formSection">
              <div className="sectionTitle">Shipping</div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) => onChane(e)}
                  value={date}
                  disabled={!edit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edate">Estimate Date</label>
                <input
                  type="date"
                  name="edate"
                  id="edate"
                  onChange={(e) => onChane(e)}
                  value={edate}
                  disabled={!edit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tracking">Tracking</label>
                <input
                  type="text"
                  name="tracking"
                  id="tracking"
                  onChange={(e) => onChane(e)}
                  value={tracking}
                  disabled={!edit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="carrier">Carrier</label>
                <input
                  type="text"
                  name="carrier"
                  id="carrier"
                  onChange={(e) => onChane(e)}
                  value={carrier}
                  disabled={!edit}
                />
              </div>
            </div>
            <div className="formSection">
              <div className="sectionTitle">Part</div>
              <div className="form-group">
                <label htmlFor="supplier">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  id="supplier"
                  onChange={(e) => onChane(e)}
                  value={supplier}
                  disabled={!edit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="part">Part</label>
                <input
                  type="text"
                  name="part"
                  id="part"
                  onChange={(e) => onChane(e)}
                  value={part}
                  disabled={!edit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="device">Device</label>
                <input
                  type="text"
                  name="device"
                  id="device"
                  onChange={(e) => onChane(e)}
                  value={device}
                  disabled={!edit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  onChange={(e) => onChane(e)}
                  value={model}
                  disabled={!edit}
                />
              </div>
            </div>
            <div className="formSection">
              <div className="sectionTitle">Finnace</div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  onChange={(e) => onChane(e)}
                  onFocus={handleFocus}
                  value={quantity}
                  disabled={!edit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cost">Cost Each</label>
                <input
                  type="text"
                  name="cost"
                  id="cost"
                  onChange={(e) => onChane(e)}
                  onFocus={handleFocus}
                  value={cost}
                  disabled={!edit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="deposit">Deposit</label>
                <input
                  type="text"
                  name="deposit"
                  id="deposit"
                  onChange={(e) => onChane(e)}
                  onFocus={handleFocus}
                  value={deposit}
                  disabled={!edit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="msrp">MSRP</label>
                <input
                  type="text"
                  name="msrp"
                  id="msrp"
                  onChange={(e) => onChane(e)}
                  onFocus={handleFocus}
                  value={msrp}
                  disabled={!edit}
                />
              </div>
            </div>
            <div className="formSection">
              <div className="sectionTitle">Customer</div>
              <div className="form-group checkbox">
                <input
                  className="form-checkbox"
                  type="checkbox"
                  name="isStore"
                  id="isStore"
                  checked={Boolean(isStore)}
                  onChange={(e) => onChane(e)}
                  value={isStore}
                  disabled={!edit}
                />
                <label className="form-checkbox-label" htmlFor="isStore">
                  Store ?
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => onChane(e)}
                  value={name}
                  disabled={isStore || !edit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={(e) => onChane(e)}
                  value={phone}
                  disabled={isStore || !edit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => onChane(e)}
                  value={email}
                  disabled={isStore || !edit}
                />
              </div>
            </div>
            <button
              className="hide"
              type="submit"
              onSubmit={(e) => onSubmit(e)}
            ></button>
          </form>
          <div className="buttons">
            <button type="submit" onClick={(e) => onSubmit(e)} disabled={!edit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default DetailModal;
