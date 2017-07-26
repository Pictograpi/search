import { combineReducers, createStore } from "redux";
import UserReducer from "../User";

const reducers = combineReducers({
  user: UserReducer
});
const store = createStore(reducers);

export default store;
