import { createAppAsyncThunk } from "../create-app-thunk";
import { Property } from "../models/property.entity";

export const addToFavorites = createAppAsyncThunk(
  "properties/addToFavorite",
  async (property: Property, { extra: { propertyGateway } }) => {
    await propertyGateway.addToFavorites(property);

    return { ...property, isFavorite: true };
  },
);
