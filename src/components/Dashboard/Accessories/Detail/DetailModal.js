import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";

import "../../../../style/newpart.css";
import "../../../../style/modal.css";

import { modalForm } from "./modalForm";

const DetailModal = ({
  modalState,
  onClose,
  p,
  onModalSubmit,
  onModalDelete,
  suppliers,
  carriers,
  devices,
  types,
}) => {
  // console.log(p && p[0].user._id);

  // console.log("from Detail Modal :", p);

  const [selectedSupplier, setSelectedSupplier] = useState();
  const [selectedCarrier, setSelectedCarrier] = useState();
  const [selectedDevice, setSelectedDevice] = useState();
  const [selectedType, setSelectedType] = useState();

  const [formdata, setFormdata] = useState({
    user: "",
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
    edit: false,
    id: "",
    status: null,
  });

  const { isStore, edit, id } = formdata;

  //   console.log("ccjcjasjcasc : ", formdata);

  useEffect(() => {
    //   if ()

    setSelectedSupplier(
      p && p[0].detail.supplier._id ? p[0].detail.supplier._id : ""
    );

    setSelectedCarrier(
      p && p[0].shipping.carrier._id ? p[0].shipping.carrier._id : ""
    );

    setSelectedDevice(
      p && p[0].detail.device._id ? p[0].detail.device._id : ""
    );

    setSelectedType(p && p[0].detail.type._id ? p[0].detail.type._id : "");

    setFormdata((f) => {
      return {
        ...f,
        id: p && p[0]._id ? p[0]._id : "",
        user: p && p[0].user._id ? p[0].user._id : "",
        date: p && p[0].date ? p[0].date.split("T")[0] : "",
        edate:
          p && p[0].shipping.edate ? p[0].shipping.edate.split("T")[0] : "",
        tracking: p && p[0].shipping.tracking ? p[0].shipping.tracking : "",
        carrier:
          p && p[0].shipping.carrier._id ? p[0].shipping.carrier._id : "",
        supplier: p && p[0].detail.supplier._id ? p[0].detail.supplier._id : "",
        type: p && p[0].detail.type._id ? p[0].detail.type._id : "",
        accessory: p && p[0].detail.accessory ? p[0].detail.accessory : "",
        device: p && p[0].detail.device._id ? p[0].detail.device._id : "",
        model: p && p[0].detail.model ? p[0].detail.model : "",
        quantity: p && p[0].finance.quantity ? p[0].finance.quantity : "0",
        cost: p && p[0].finance.cost ? p[0].finance.cost : "0",
        deposit: p && p[0].finance.deposit ? p[0].finance.deposit : "0",
        msrp: p && p[0].finance.msrp ? p[0].finance.msrp : "0",
        isStore: p && p[0].isStore ? Boolean(p[0].isStore) : Boolean(false),
        name: p && p[0].customer.name ? p[0].customer.name : "",
        phone: p && p[0].customer.phone ? p[0].customer.phone : "",
        email: p && p[0].customer.email ? p[0].customer.email : "",
        note: p && p[0].note ? p[0].note : "",
        status: p && p[0].status ? p[0].status : null,
      };
    });

    return () => {
      // Clean up the subscription
      clearForm();
    };
    // eslint-disable-next-line
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
      status: null,
      edit: false,
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

  const selectCallbackModalForm = (name, value) => {
    setFormdata((f) => {
      return {
        ...f,
        [name]: value,
      };
    });
  };

  // select all Text on focus of form input
  const handleFocus = (e) => e.target.select();

  const onSubmit = async (e) => {
    e.preventDefault();
    await onModalSubmit(formdata);
    // clearForm();
    // closeModal();
  };

  const onDelete = async (e) => {
    e.preventDefault();
    let result = window.confirm("want to delete? ");
    if (result) {
      await onModalDelete(id);
      clearForm();
      onClose();
    }
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

  const handleStatus = (e) => {
    // console.log(e.target.id);
    const targetID = e.target.id;
    if (targetID) {
      setFormdata({
        ...formdata,
        status: targetID,
      });
    }
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
        {modalForm(formdata, {
          selectCallbackModalForm,
          onChane,
          handleFocus,
          onSubmit,
          onDelete,
          toggleEdit,
          handleStatus,
          selectedSupplier,
          suppliers,
          carriers,
          devices,
          selectedCarrier,
          selectedDevice,
          selectedType,
          types,
        })}
        {/* contentDiv */}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default DetailModal;
