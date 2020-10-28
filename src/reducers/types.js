import { types } from "../actions/types";

const initialState = {
  loading: true,
  types: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ALL_TYPES:
      return {
        ...state,
        loading: false,
        types: payload,
      };
    default:
      return state;
  }
}
