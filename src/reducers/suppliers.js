import { supplier } from "../actions/types";

const initialState = {
  loading: true,
  suppliers: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case supplier.GET_ALL_SUPPLIERS:
      return {
        ...state,
        loading: false,
        suppliers: payload,
      };
    default:
      return state;
  }
}
