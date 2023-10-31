import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import customerAuthReducer from "./reducers/customerAuthReducer";
import customerCartReducer from "./reducers/customerCartReducer";

import adminUserReducer from "../../admin-site/store/reducers/adminUserReducer";
import adminAuthReducer from "../../admin-site/store/reducers/adminAuthReducer";
import productAdReducer from "../../admin-site/store/reducers/productAdReducer";

const rootReducer = combineReducers({
  customerAuthReducer: customerAuthReducer,
  customerCartReducer: customerCartReducer,

  adminAuthReducer: adminAuthReducer,
  adminUserReducer: adminUserReducer,
  productAdReducer: productAdReducer,
});

// const store = configureStore({
//   reducer: reducer,
// });

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const preloadedState = loadFromLocalStorage();

// lấy preloadedState làm giá trị khởi tạo cho redux store
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default store;
