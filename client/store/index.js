import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import faveGroups from "./faveGroups";
import allGroups from "./allGroups";
import orders from "./orders";
import singleOrder from "./singleOrder";
import singleGroup from "./singleGroup";
import items from "./items";
import tracking from "./tracking";

const reducer = combineReducers({
  auth,
  faveGroups,
  allGroups,
  orders,
  singleOrder,
  singleGroup,
  items,
  tracking,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
