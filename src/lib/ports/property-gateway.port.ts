import { Property } from "../models/property.entity";

export interface PropertyGateway {
  getProperties(): Promise<Property[]>;
  addToFavorites(property: Property): Promise<void>;
}
