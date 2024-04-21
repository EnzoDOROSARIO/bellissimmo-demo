import { createAppAsyncThunk } from "../create-app-thunk";

export const getProperties = createAppAsyncThunk(
  "properties/getProperties",
  (_, { extra: { propertyGateway } }) => {
    return propertyGateway.getProperties();
  },
);
