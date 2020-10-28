import axios from "axios";
// IMPORT ALERT HERE
import { axiosURL, accessory } from "../actions/types";
import setAuthToken from "../utils/setAuthToken";

// SET AXIOS PROXY BASEURL
axios.defaults.baseURL = axiosURL;

// Get All Parts
export const getAccessories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/accessory");

    dispatch({
      type: accessory.GET_ALL_ACCESSORIES,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Get All Parts
export const getAccessoriesbyMonth = (y, m) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/accessory/month/${y}/${m}`);

    dispatch({
      type: accessory.GET_ACCESSORIES_MONTH,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Post Part
export const postAccessory = (formdata) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formdata);

  try {
    const res = await axios.post(
      "/api/v1/accessory/addaccessory",
      body,
      config
    );

    dispatch({
      type: accessory.POST_ACCESSORY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //     errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    //   }

    dispatch({
      type: accessory.POST_ACCESSORY_FAIL,
    });

    // delete this bellow after set alert dispatches check auth.js Login User
    console.error(err);
  }
};

// Delete Selected Part
export const deleteAccessory = (mId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(`/api/v1/accessory/${mId}`, config);
    dispatch({
      type: accessory.DELETE_ACCESSORY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: accessory.DELETE_ACCESSORY_FAIL,
    });
    console.error(err);
  }
};
