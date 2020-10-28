import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import moment from "moment";

import "../../../../style/newpart.css";
import "../../../../style/modal.css";

import Select from "../../../utils/domComponents/Select";

const formStyle = {
  width: "100%",
  textAlign: "center",
};

const NewAccessory = ({
  modalState,
  onClose,
  onModalSubmit,
  user,
  suppliers,
  carriers,
  devices,
  types,
}) => {
  const userID = user && user._id;

  const [formdata, setFormdata] = useState({
    user: "",
    date: moment().format("yyyy-MM-D"),
    edate: "",
    tracking: "",
    carrier: "",
    supplier: "",
    type: "",
    accessory: "",
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
    note: "",
  });

  const {
    date,
    edate,
    tracking,
    // carrier,
    // supplier,
    // device,
    accessory,
    model,
    quantity,
    cost,
    deposit,
    msrp,
    isStore,
    name,
    phone,
    email,
    note,
  } = formdata;

  useEffect(() => {
    setFormdata((f) => {
      return {
        ...f,
        user: userID,
      };
    });
  }, [userID]);

  const clearForm = () => {
    setFormdata({
      ...formdata,
      date: "",
      edate: "",
      tracking: "",
      carrier: "",
      supplier: "",
      type: "",
      accessory: "",
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
      note: "",
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
  };

  // select all Text on focus of form input
  const handleFocus = (e) => e.target.select();

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(formdata);
    await onModalSubmit(formdata);
    clearForm();
    onClose();
  };

  const closeModal = () => {
    clearForm();
    onClose();
  };

  const selectCallback = (name, value) => {
    setFormdata((f) => {
      return {
        ...f,
        [name]: value,
      };
    });
  };

  if (!modalState) return null;

  return ReactDom.createPortal(
    <div className={`modal modalShowing-${modalState}`}>
      <div className="modalInner">
        <button className="modalClose" onClick={closeModal}>
          Close
        </button>
        {/* Content here */}
        <h1 style={formStyle}>New Accessory</h1>
        <div className="myForm">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="formSection groupShipping">
              <div className="sectionTitle">Shipping</div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) => onChane(e)}
                  value={date}
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="carrier">Carrier</label>
                <Select
                  name="carrier"
                  datas={carriers && carriers}
                  callback={(name, value) => selectCallback(name, value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="supplier">Supplier</label>
                <Select
                  name="supplier"
                  datas={suppliers && suppliers}
                  callback={(name, value) => selectCallback(name, value)}
                />
              </div>
            </div>
            <div className="formSection groupPart">
              <div className="sectionTitle">Accessory</div>

              <div className="form-group">
                <label htmlFor="accessory">Accessory</label>
                <input
                  type="text"
                  name="accessory"
                  id="accessory"
                  onChange={(e) => onChane(e)}
                  value={accessory}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <Select
                  name="type"
                  datas={types && types}
                  callback={(name, value) => selectCallback(name, value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="device">Device</label>
                <Select
                  name="device"
                  datas={devices && devices}
                  callback={(name, value) => selectCallback(name, value)}
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
                />
              </div>
            </div>
            <div className="formSection groupFinance">
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
                />
              </div>
            </div>
            <div className="formSection groupCustomer">
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
                  disabled={isStore}
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
                  disabled={isStore}
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
                  disabled={isStore}
                />
              </div>
            </div>

            <button
              className="hide"
              type="submit"
              onSubmit={(e) => onSubmit(e)}
            ></button>

            <div className="formSection-note">
              <div className="form-group">
                <label htmlFor="note">Note</label>
                <textarea
                  name="note"
                  id="note"
                  cols="30"
                  rows="10"
                  onChange={(e) => onChane(e)}
                  value={note}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="buttons">
            <button type="submit" onClick={(e) => onSubmit(e)}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default NewAccessory;
