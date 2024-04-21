import { Property } from "../models/property.entity";

export interface PropertyGateway {
  getProperties(): Promise<Property[]>;
}
