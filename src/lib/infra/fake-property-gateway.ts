import { PropertyGateway } from "../ports/property-gateway.port";
import { Property } from "../models/property.entity";

export class FakePropertyGateway implements PropertyGateway {
  lastPropertyAddedToFavorites?: Property;
  properties: Property[] = [];

  constructor(private timeoutInMs: number = 0) {}

  getProperties(): Promise<Property[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.properties), this.timeoutInMs),
    );
  }

  addToFavorites(property: Property): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.lastPropertyAddedToFavorites = property;
        return resolve();
      }, this.timeoutInMs),
    );
  }
}
