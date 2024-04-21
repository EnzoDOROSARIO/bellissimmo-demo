import { beforeEach, describe, test } from "vitest";
import { PropertyFixture, createPropertyFixture } from "./properties.fixture";
import { buildProperty } from "./property.builder";

describe("Feature: Add a property to favorite", () => {
  let fixture: PropertyFixture;

  beforeEach(() => {
    fixture = createPropertyFixture();
  });

  test("It should add the property to favorites", async () => {
    const property = buildProperty({ id: "1", isFavorite: false });
    fixture.givenExistingProperties([
      property,
      buildProperty({ id: "2", name: "Property 2" }),
    ]);

    const action = fixture.whenAddingPropertyToFavorites(property);
    await action;

    fixture.thenPropertyShouldBeAddedToFavorites(property);
    fixture.thenPropertiesShouldBe([
      buildProperty({ id: "1", isFavorite: true }),
      buildProperty({ id: "2", name: "Property 2" }),
    ]);
  });
});
