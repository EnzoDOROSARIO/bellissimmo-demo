import { useDispatch, useSelector } from "react-redux";
import {
  PropertiesViewModelType,
  createPropertiesViewModel,
} from "./properties.viewmodel";
import { PropertyCard } from "../PropertyCard";

export const Properties = () => {
  const dispatch = useDispatch();
  const viewModel = useSelector(createPropertiesViewModel({ dispatch }));

  if (viewModel.type === PropertiesViewModelType.PropertiesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {viewModel.properties.map((property) => (
        <PropertyCard
          property={property}
          onAddToFavoriteClick={viewModel.handleAddToFavorites}
        />
      ))}
    </div>
  );
};
