import { createSlice } from "@reduxjs/toolkit";
import { alertsAdapter } from "../models/alert.entity";
import { RootState } from "../create-store";
import { addToFavorites } from "../usecases/add-to-favorites.usecase";

export const alertsSlice = createSlice({
  name: "alerts",
  initialState: alertsAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      alertsAdapter.addOne(state, {
        id: alertsAdapter.getSelectors().selectIds(state).length.toString(),
        message: `${action.payload.name} a été ajouté à vos favoris.`,
      });
    });
  },
});

export const selectLastAlert = (state: RootState) =>
  alertsAdapter.getSelectors().selectAll(state.alerts).slice(-1)[0];
