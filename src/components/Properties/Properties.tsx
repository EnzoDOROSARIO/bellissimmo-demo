import { useDispatch, useSelector } from "react-redux";
import {
  PropertiesViewModelType,
  createPropertiesViewModel,
} from "./properties.viewmodel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Property } from "@/lib/models/property.entity";

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

export const PropertyCard = ({
  property,
  onAddToFavoriteClick,
}: {
  property: Property;
  onAddToFavoriteClick: (p: Property) => any;
}) => (
  <Card key={property.id}>
    <CardHeader>
      <CardTitle>
        {property.name} ({property.price})
      </CardTitle>
      <CardDescription>{property.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <img src={property.pictureUrl} />
    </CardContent>
    <CardFooter>
      {property.isFavorite ? (
        <Button className="w-full">Retirer des favoris</Button>
      ) : (
        <Button
          onClick={() => onAddToFavoriteClick(property)}
          className="w-full"
        >
          Ajouter aux favoris
        </Button>
      )}
    </CardFooter>
  </Card>
);
