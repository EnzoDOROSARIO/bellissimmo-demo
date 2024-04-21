import { Property } from "@/lib/models/property.entity";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

export const PropertyCard = ({
  property,
  onAddToFavoriteClick,
}: {
  property: Property;
  onAddToFavoriteClick?: (p: Property) => any;
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
    {onAddToFavoriteClick && (
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
    )}
  </Card>
);
