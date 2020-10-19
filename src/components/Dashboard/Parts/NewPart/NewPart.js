import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import moment from "moment";

import "../../../../style/newpart.css";
import "../../../../style/modal.css";

const formStyle = {
  width: "100%",
  textAlign: "center",
};

const NewPart = ({
  modalState,
  onClose,
  onModalSubmit,
  user,
  suppliers,
  carriers,
}) => {
  const userID = user && user._id;

  const [selectedSupplier, setSelectedSupplier] = useState();
  const [selectedCarrier, setSelectedCarrier] = useState();

  const [formdata, setFormdata] = useState({
    user: "",
    date: moment().format("yyyy-MM-D"),
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
  });

  const {
    date,
    edate,
    tracking,
    carrier,
    // supplier,
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
  } = formdata;

  useEffect(() => {
    // SET DEFAULT suppliers value
    if (suppliers[0] && suppliers[0]._id) {
      setSelectedSupplier(suppliers[0]._id);
      setFormdata((f) => {
        return {
          ...f,
          supplier: suppliers[0]._id,
        };
      });
    }

    if (carriers[0] && carriers[0]._id) {
      setSelectedCarrier(carriers[0]._id);
      setFormdata((f) => {
        return {
          ...f,
          carrier: carriers[0]._id,
        };
      });
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Set UserID when we gor the ID
    // setFormdata({
    //   ...formdata,
    //   user: userID,
    // });
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
    if (e.target.name === "supplier") {
      setSelectedSupplier(e.target.value);
    }
    if (e.target.name === "carrier") {
      setSelectedCarrier(e.target.value);
    }
    setFormdata({ ...formdata, [e.target.name]: e.target.value });

    // console.log(formdata);
  };

  // select all Text on focus of form input
  const handleFocus = (e) => e.target.select();

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(formdata);
    await onModalSubmit(formdata);
    clearForm();
  };

  const closeModal = () => {
    clearForm();
    onClose();
  };

  if (!modalState) return null;

  return ReactDom.createPortal(
    <div className={`modal modalShowing-${modalState}`}>
      <div className="modalInner">
        <button className="modalClose" onClick={closeModal}>
          Close
        </button>
        {/* Content here */}
        <h1 style={formStyle}>New Part</h1>
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
                {/* <input
                  type="text"
                  name="carrier"
                  id="carrier"
                  onChange={(e) => onChane(e)}
                  value={carrier}
                /> */}

                <select
                  name="carrier"
                  id="carrier"
                  onChange={(e) => onChane(e)}
                  value={selectedCarrier}
                >
                  {carriers.map((carrier) => {
                    return (
                      <option key={carrier._id} value={carrier._id}>
                        {carrier.company}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="formSection">
              <div className="sectionTitle">Part</div>
              <div className="form-group">
                <label htmlFor="supplier">Supplier</label>
                {/* <input
                  type="text"
                  name="supplier"
                  id="supplier"
                  onChange={(e) => onChane(e)}
                  value={supplier}
                /> */}
                <select
                  name="supplier"
                  id="supplier"
                  onChange={(e) => onChane(e)}
                  value={selectedSupplier}
                >
                  {suppliers.map((supplier) => {
                    return (
                      <option key={supplier._id} value={supplier._id}>
                        {supplier.company}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="part">Part</label>
                <input
                  type="text"
                  name="part"
                  id="part"
                  onChange={(e) => onChane(e)}
                  value={part}
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

export default NewPart;
