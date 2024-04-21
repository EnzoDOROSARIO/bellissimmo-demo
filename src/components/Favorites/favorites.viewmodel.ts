import { RootState } from "@/lib/create-store";
import { Property } from "@/lib/models/property.entity";
import { selectFavorites } from "@/lib/slices/properties.slice";

export type FavoritesViewModel = {
  favorites: Property[];
};

export const createFavoritesViewModel =
  () =>
  (state: RootState): FavoritesViewModel => {
    const favorites = selectFavorites(state);

    return {
      favorites,
    };
  };
