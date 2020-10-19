import { shipping } from "../actions/types";

const initialState = {
  loading: true,
  carriers: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case shipping.GET_ALL_CARRIERS:
      return {
        ...state,
        loading: false,
        carriers: payload,
      };
    default:
      return state;
  }
}
