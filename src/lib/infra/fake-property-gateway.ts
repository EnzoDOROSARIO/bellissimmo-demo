import { PropertyGateway } from "../ports/property-gateway.port";
import { Property } from "../models/property.entity";

export class FakePropertyGateway implements PropertyGateway {
  properties: Property[] = [];

  async getProperties(): Promise<Property[]> {
    return this.properties;
  }
}
