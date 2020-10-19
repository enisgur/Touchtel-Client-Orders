import axios from "axios";
// IMPORT ALERT HERE
import { axiosURL, shipping } from "../actions/types";

// SET AXIOS PROXY BASEURL
axios.defaults.baseURL = axiosURL;

// Get All Parts
export const getCarriers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/carriers");

    dispatch({
      type: shipping.GET_ALL_CARRIERS,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};
