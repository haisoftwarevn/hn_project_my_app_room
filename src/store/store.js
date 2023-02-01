// import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./reducer";
// export const store = configureStore({
//   reducer: reducer,
// });

import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const rootReducer = combineReducers({
  hn_room: reducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
