import { RootState } from "@/lib/create-store";
import { Property } from "@/lib/models/property.entity";
import {
  selectArePropertiesLoading,
  selectProperties,
} from "@/lib/slices/properties.slice";

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
    };

export const createPropertiesViewModel =
  () =>
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
    };
  };
