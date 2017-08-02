import { combineReducers, createStore, applyMiddleware } from "redux";
import Pictographs from "./Pictographs";
import Config from "./Config";
import thunk from "redux-thunk";

const reducers = combineReducers({
  pictographs: Pictographs,
  config: Config
});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
