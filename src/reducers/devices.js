import { device } from "../actions/types";

const initialState = {
  loading: true,
  devices: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case device.GET_ALL_DEVICES:
      return {
        ...state,
        loading: false,
        devices: payload,
      };
    default:
      return state;
  }
}
