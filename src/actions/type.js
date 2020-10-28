import axios from "axios";
// IMPORT ALERT HERE
import { axiosURL, types } from "../actions/types";

// SET AXIOS PROXY BASEURL
axios.defaults.baseURL = axiosURL;

// Get All Parts
export const getTypes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/types");

    dispatch({
      type: types.GET_ALL_TYPES,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};
