import { beforeEach, describe, test } from "vitest";
import { buildProperty } from "./property.builder";
import { PropertyFixture, createPropertyFixture } from "./properties.fixture";

describe("Feature: Retrieve available properties", () => {
  let fixture: PropertyFixture;

  beforeEach(() => {
    fixture = createPropertyFixture();
  });

  test("It should retrieves properties", async () => {
    fixture.givenExistingRemoteProperties([
      buildProperty({ id: "1", name: "Property 1" }),
      buildProperty({ id: "2", name: "Property 2" }),
    ]);

    const action = fixture.whenRetrievingProperties();
    fixture.thenPropertiesShouldBeLoading();
    await action;

    fixture.thenPropertiesShouldBe([
      buildProperty({ id: "1", name: "Property 1" }),
      buildProperty({ id: "2", name: "Property 2" }),
    ]);
  });
});
