import { useSelector } from "react-redux";
import { createFavoritesViewModel } from "./favorites.viewmodel";
import { PropertyCard } from "../PropertyCard";

export const Favorites = () => {
  const viewModel = useSelector(createFavoritesViewModel());

  return (
    <div className="grid grid-cols-3 gap-4">
      {viewModel.favorites.map((favorite) => (
        <PropertyCard key={favorite.id} property={favorite} />
      ))}
    </div>
  );
};
