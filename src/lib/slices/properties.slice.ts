import { EntityState, createSlice } from "@reduxjs/toolkit";
import { Property, propertiesAdapter } from "../models/property.entity";
import { getProperties } from "../usecases/get-properties.usecase";
import { RootState } from "../create-store";
import { addToFavorites } from "../usecases/add-to-favorites.usecase";

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
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      propertiesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    });
  },
});

export const selectArePropertiesLoading = (state: RootState) =>
  state.properties.loading;

export const selectProperties = (state: RootState) =>
  propertiesAdapter.getSelectors().selectAll(state.properties);
