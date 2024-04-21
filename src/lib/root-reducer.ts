import { combineReducers } from "@reduxjs/toolkit";
import { propertiesSlice } from "./slices/properties.slice";
import { alertsSlice } from "./slices/alerts.slice";

export const rootReducer = combineReducers({
  properties: propertiesSlice.reducer,
  alerts: alertsSlice.reducer,
});
