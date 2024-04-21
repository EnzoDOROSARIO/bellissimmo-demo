import { createSlice } from "@reduxjs/toolkit";
import { alertsAdapter } from "../models/alert.entity";
import { RootState } from "../create-store";

export const alertsSlice = createSlice({
  name: "alerts",
  initialState: alertsAdapter.getInitialState(),
  reducers: {},
});

export const selectLastAlert = (state: RootState) =>
  alertsAdapter.getSelectors().selectAll(state.alerts).slice(-1)[0];
