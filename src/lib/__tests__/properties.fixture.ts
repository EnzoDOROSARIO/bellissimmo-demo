import { expect } from "vitest";
import { AppStore, createTestStore } from "../create-store";
import { FakePropertyGateway } from "../infra/fake-property-gateway";
import { Property } from "../models/property.entity";
import { stateBuilder, stateBuilderProvider } from "../state-builder";
import { getProperties } from "../usecases/get-properties.usecase";
import { selectArePropertiesLoading } from "../slices/properties.slice";

export const createPropertyFixture = (
  testStateBuilderProvider = stateBuilderProvider(),
) => {
  let store: AppStore;
  const propertyGateway = new FakePropertyGateway();
  return {
    givenExistingRemoteProperties(properties: Property[]) {
      propertyGateway.properties = [...properties];
    },
    async whenRetrievingProperties() {
      store = createTestStore(
        { propertyGateway },
        testStateBuilderProvider.getState(),
      );
      return store.dispatch(getProperties());
    },
    thenPropertiesShouldBeLoading() {
      const arePropertiesLoading = selectArePropertiesLoading(store.getState());
      expect(arePropertiesLoading).toBe(true);
    },
    thenPropertiesShouldBe(expectedProperties: Property[]) {
      const expectedState = stateBuilder(testStateBuilderProvider.getState())
        .withPropertiesNotLoading(undefined)
        .withProperties(expectedProperties)
        .build();

      expect(store.getState()).toEqual(expectedState);
    },
  };
};

export type PropertyFixture = ReturnType<typeof createPropertyFixture>;
