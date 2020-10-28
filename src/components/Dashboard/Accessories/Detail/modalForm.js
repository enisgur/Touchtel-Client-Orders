import React, { Fragment } from "react";

import Select from "../../../utils/domComponents/Select";

export const modalForm = (formData, handles) => {
  const formStyle = {
    width: "100%",
    textAlign: "center",
  };

  const {
    date,
    edate,
    tracking,
    // carrier,
    // supplier,
    accessory,
    // device,
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
    status,
    edit,
  } = formData;

  const {
    selectCallbackModalForm,
    onChane,
    handleFocus,
    onSubmit,
    onDelete,
    toggleEdit,
    handleStatus,
    selectedSupplier,
    suppliers,
    selectedDevice,
    devices,
    selectedCarrier,
    carriers,
    selectedType,
    types,
  } = handles;

  const selectCallback = (name, value) => {
    selectCallbackModalForm(name, value);
    // setFormdata((f) => {
    //   return {
    //     ...f,
    //     [name]: value,
    //   };
    // });
  };

  return (
    <Fragment>
      <h1 style={formStyle}>Order Details</h1>

      <div className="status">
        {/* <div className="notordered">Not ordered</div> */}
        <div
          onClick={(e) => handleStatus(e)}
          id={0}
          className={`${status && "modal-status ready"}`}
        >
          Ordered
        </div>
        <div
          onClick={(e) => handleStatus(e)}
          id={1}
          className={`${
            status
              ? status > 0
                ? "modal-status ready"
                : "modal-status"
              : "modal-status"
          }`}
        >
          Shipped
        </div>
        <div
          onClick={(e) => handleStatus(e)}
          id={2}
          className={`${status > 1 ? "modal-status ready" : "modal-status"}`}
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
              <Select
                name="carrier"
                datas={carriers && carriers}
                selected={selectedCarrier}
                isDetail={true}
                disabled={!edit}
                callback={(name, value) => selectCallback(name, value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="supplier">Supplier</label>
              <Select
                name="supplier"
                datas={suppliers && suppliers}
                selected={selectedSupplier}
                isDetail={true}
                disabled={!edit}
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
                disabled={!edit}
              />
            </div>
            <div className="form-group">
              <label htmlFor="supplier">Type</label>
              <Select
                name="type"
                datas={types && types}
                selected={selectedType}
                isDetail={true}
                disabled={!edit}
                callback={(name, value) => selectCallback(name, value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="device">Device</label>
              <Select
                name="device"
                datas={devices && devices}
                selected={selectedDevice}
                isDetail={true}
                disabled={!edit}
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
                disabled={!edit}
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

          <div className="formSection-note">
            <div className="form-group">
              <label htmlFor="note">Note</label>
              <textarea
                name="note"
                id="note"
                cols="30"
                rows="5"
                onChange={(e) => onChane(e)}
                value={note}
                disabled={!edit}
              ></textarea>
            </div>
          </div>
        </form>
        <div className="buttons">
          <button className="btn-delete" onClick={(e) => onDelete(e)}>
            Delete
          </button>
          <button type="submit" onClick={(e) => onSubmit(e)} disabled={!edit}>
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};
