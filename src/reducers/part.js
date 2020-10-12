import { part } from "../actions/types";

const initialState = {
  loading: true,
  parts: null,
  lastPart: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case part.GET_ALL_PARTS:
      return {
        ...state,
        loading: false,
        parts: payload,
      };
    case part.POST_PART_SUCCESS:
      return {
        ...state,
        loading: false,
        lastPart: payload,
      };
    default:
      return state;
  }
}
