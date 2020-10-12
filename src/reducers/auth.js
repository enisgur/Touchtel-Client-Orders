import {
  // auth.REGISTER_SUCCESS,
  // auth.REGISTER_FAIL,
  // auth.USER_LOADED,
  // auth.AUTH_ERROR,
  // auth.LOGIN_FAIL,
  // auth.LOGIN_SUCCESS,
  // auth.LOGOUT,
  auth,
} from "../actions/types";

const initialStte = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialStte, action) {
  const { type, payload } = action;

  switch (type) {
    case auth.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case auth.REGISTER_SUCCESS:
    case auth.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case auth.REGISTER_FAIL:
    case auth.AUTH_ERROR:
    case auth.LOGIN_FAIL:
    case auth.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
