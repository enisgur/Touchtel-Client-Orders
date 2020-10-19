import axios from "axios";
// IMPORT ALERT HERE
import { axiosURL, supplier } from "../actions/types";

// SET AXIOS PROXY BASEURL
axios.defaults.baseURL = axiosURL;

// Get All Parts
export const getSuppliers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/suppliers");

    dispatch({
      type: supplier.GET_ALL_SUPPLIERS,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};
