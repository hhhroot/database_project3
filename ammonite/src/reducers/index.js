import { combineReducers } from "redux";
import members from "./members";
import reserve from "./reserve"

export default combineReducers({
    members,
    reserve,
});