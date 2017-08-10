import { combineReducers, createStore, applyMiddleware } from "redux";
import Pictographs from "./Pictographs";
import Languages from "./Languages";
import Config from "./Config";
import thunk from "redux-thunk";

const reducers = combineReducers({
  pictographs: Pictographs,
  languages: Languages,
  config: Config
});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
