import React, { Fragment } from "react";

export const modalForm = (formData, handles) => {
  const formStyle = {
    width: "100%",
    textAlign: "center",
  };

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
  } = formData;

  const { onChane, handleFocus, onSubmit, toggleEdit, handleStatus } = handles;

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
    </Fragment>
  );
};
