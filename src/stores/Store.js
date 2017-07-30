import { combineReducers, createStore, applyMiddleware } from "redux";
import User from "./User";
import Pictograms from "./Pictograms";
import Config from "./Config";
import thunk from "redux-thunk";

const reducers = combineReducers({
  user: User,
  pictograms: Pictograms,
  config: Config
});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
