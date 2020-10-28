import axios from "axios";
// IMPORT ALERT HERE
import { axiosURL, device } from "../actions/types";

// SET AXIOS PROXY BASEURL
axios.defaults.baseURL = axiosURL;

// Get All Parts
export const getDevices = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/devices");

    dispatch({
      type: device.GET_ALL_DEVICES,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};
