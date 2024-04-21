import { PropertyGateway } from "../ports/property-gateway.port";
import { Property } from "../models/property.entity";

export class FakePropertyGateway implements PropertyGateway {
  lastPropertyAddedToFavorites?: Property;
  properties: Property[] = [];

  async getProperties(): Promise<Property[]> {
    return this.properties;
  }
  async addToFavorites(property: Property): Promise<void> {
    this.lastPropertyAddedToFavorites = property;
  }
}
