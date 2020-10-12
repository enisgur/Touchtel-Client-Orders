import axios from "axios";
// IMPORT ALERT HERE
import { axiosURL, part } from "../actions/types";
import setAuthToken from "../utils/setAuthToken";

// SET AXIOS PROXY BASEURL
axios.defaults.baseURL = axiosURL;

// Get All Parts
export const getParts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/parts");

    dispatch({
      type: part.GET_ALL_PARTS,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Post Part
export const postPart = (formdata) => async (dispatch) => {
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
    const res = await axios.post("/api/v1/parts/addproduct", body, config);

    dispatch({
      type: part.POST_PART_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //     errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    //   }

    dispatch({
      type: part.POST_PART_FAIL,
    });

    // delete this bellow after set alert dispatches check auth.js Login User
    console.error(err);
  }
};
