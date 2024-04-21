import { expect } from "vitest";
import { AppStore, createTestStore } from "../create-store";
import { FakePropertyGateway } from "../infra/fake-property-gateway";
import { Property } from "../models/property.entity";
import { stateBuilder, stateBuilderProvider } from "../state-builder";
import { getProperties } from "../usecases/get-properties.usecase";
import { selectArePropertiesLoading } from "../slices/properties.slice";
import { addToFavorites } from "../usecases/add-to-favorites.usecase";

export const createPropertyFixture = (
  testStateBuilderProvider = stateBuilderProvider(),
) => {
  let store: AppStore;
  const propertyGateway = new FakePropertyGateway();
  return {
    givenExistingRemoteProperties(properties: Property[]) {
      propertyGateway.properties = [...properties];
    },
    givenExistingProperties(properties: Property[]) {
      testStateBuilderProvider.setState((builder) =>
        builder.withProperties(properties),
      );
    },
    async whenRetrievingProperties() {
      store = createTestStore(
        { propertyGateway },
        testStateBuilderProvider.getState(),
      );
      return store.dispatch(getProperties());
    },
    async whenAddingPropertyToFavorites(property: Property) {
      store = createTestStore(
        { propertyGateway },
        testStateBuilderProvider.getState(),
      );
      return store.dispatch(addToFavorites(property));
    },
    thenPropertyShouldBeAddedToFavorites(property: Property) {
      expect(propertyGateway.lastPropertyAddedToFavorites).toEqual(property);
    },
    thenPropertiesShouldBeLoading() {
      const arePropertiesLoading = selectArePropertiesLoading(store.getState());
      expect(arePropertiesLoading).toBe(true);
    },
    thenAnAlertShouldBeAdded(message: string) {
      const expectedState = stateBuilder(testStateBuilderProvider.getState())
        .withAlerts([{ id: "0", message }])
        .build();

      expect(expectedState.alerts).toEqual(store.getState().alerts);
    },
    thenPropertiesShouldBe(expectedProperties: Property[]) {
      const expectedState = stateBuilder(testStateBuilderProvider.getState())
        .withPropertiesNotLoading(undefined)
        .withProperties(expectedProperties)
        .build();

      expect(expectedState.properties).toEqual(store.getState().properties);
    },
  };
};

export type PropertyFixture = ReturnType<typeof createPropertyFixture>;
