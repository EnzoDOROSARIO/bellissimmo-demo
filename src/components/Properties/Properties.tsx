import { useSelector } from "react-redux";
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
  const viewModel = useSelector(createPropertiesViewModel());

  if (viewModel.type === PropertiesViewModelType.PropertiesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {viewModel.properties.map((property) => (
        <PropertyCard property={property} />
      ))}
    </div>
  );
};

export const PropertyCard = ({ property }: { property: Property }) => (
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
      <Button className="w-full">Ajouter aux favoris</Button>
    </CardFooter>
  </Card>
);
