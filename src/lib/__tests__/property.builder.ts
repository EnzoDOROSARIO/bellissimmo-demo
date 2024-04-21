import { Property } from "../models/property.entity";

export const buildProperty = ({
  id = "my-id",
  name = "Property Name",
  description = "Property Description",
  price = "0",
  pictureUrl = "picture-url",
}: {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
  pictureUrl?: string;
}): Property => ({
  id,
  name,
  description,
  price,
  pictureUrl,
});
