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
    case part.GET_PARTS_MONTH:
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
    case part.DELETE_PART_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
