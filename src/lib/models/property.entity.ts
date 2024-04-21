import { createEntityAdapter } from "@reduxjs/toolkit";

export type Property = {
  id: string;
  name: string;
  description: string;
  price: string;
  pictureUrl: string;
  isFavorite: boolean;
};

export const propertiesAdapter = createEntityAdapter<Property>();
