import { AppDispatch, RootState } from "@/lib/create-store";
import { Property } from "@/lib/models/property.entity";
import {
  selectArePropertiesLoading,
  selectProperties,
} from "@/lib/slices/properties.slice";
import { addToFavorites } from "@/lib/usecases/add-to-favorites.usecase";

export enum PropertiesViewModelType {
  PropertiesLoading = "PROPERTIES_LOADING",
  PropertiesLoaded = "PROPERTIES_LOADED",
}

export type PropertiesViewModel =
  | {
      type: PropertiesViewModelType.PropertiesLoading;
    }
  | {
      type: PropertiesViewModelType.PropertiesLoaded;
      properties: Property[];
      handleAddToFavorites: (p: Property) => Promise<void>;
    };

export const createPropertiesViewModel =
  ({ dispatch }: { dispatch: AppDispatch }) =>
  (state: RootState): PropertiesViewModel => {
    const arePropertiesLoading = selectArePropertiesLoading(state);

    if (arePropertiesLoading) {
      return {
        type: PropertiesViewModelType.PropertiesLoading,
      };
    }

    const properties = selectProperties(state);

    return {
      type: PropertiesViewModelType.PropertiesLoaded,
      properties,
      handleAddToFavorites: async (p: Property) => {
        dispatch(addToFavorites(p));
      },
    };
  };
