import { EntityState, createSlice } from "@reduxjs/toolkit";
import { Property, propertiesAdapter } from "../models/property.entity";
import { getProperties } from "../usecases/get-properties.usecase";
import { RootState } from "../create-store";

type PropertiesSliceState = EntityState<Property, Property["id"]> & {
  loading: boolean;
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState: propertiesAdapter.getInitialState({
    loading: false,
  }) as PropertiesSliceState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProperties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProperties.fulfilled, (state, action) => {
      state.loading = false;
      propertiesAdapter.addMany(state, action.payload);
    });
  },
});

export const selectArePropertiesLoading = (state: RootState) =>
  state.properties.loading;
