import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import part from "./part";
import suppliers from "./suppliers";
import carriers from "./carriers";

export default combineReducers({
  alert,
  auth,
  part,
  suppliers,
  carriers,
});
