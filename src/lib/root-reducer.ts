import { combineReducers } from "@reduxjs/toolkit";
import { propertiesSlice } from "./slices/properties.slice";

export const rootReducer = combineReducers({
  properties: propertiesSlice.reducer,
});
