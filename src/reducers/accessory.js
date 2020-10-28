import { accessory } from "../actions/types";

const initialState = {
  loading: true,
  accessories: null,
  lastAccessory: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case accessory.GET_ALL_ACCESSORIES:
    case accessory.GET_ACCESSORIES_MONTH:
      return {
        ...state,
        loading: false,
        accessories: payload,
      };
    case accessory.POST_ACCESSORY_SUCCESS:
      return {
        ...state,
        loading: false,
        lastAccessory: payload,
      };
    case accessory.DELETE_ACCESSORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
