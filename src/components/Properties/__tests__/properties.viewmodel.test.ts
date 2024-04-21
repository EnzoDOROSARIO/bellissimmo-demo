import { describe, expect, test } from "vitest";
import { RootState } from "@/lib/create-store";
import { stateBuilder } from "@/lib/state-builder";
import {
  PropertiesViewModelType,
  createPropertiesViewModel,
} from "../properties.viewmodel";
import { buildProperty } from "@/lib/__tests__/property.builder";

const createTestPropertiesViewModel = () => (rootState: RootState) =>
  createPropertiesViewModel()(rootState);

describe("Properties view mode", () => {
  test("it should return a loading state when properties are loadin", () => {
    const state = stateBuilder().withPropertiesLoading(undefined).build();

    const viewModel = createTestPropertiesViewModel()(state);

    expect(viewModel).toEqual({
      type: PropertiesViewModelType.PropertiesLoading,
    });
  });

  test("it should display properties when they are loaded", () => {
    const state = stateBuilder()
      .withPropertiesNotLoading(undefined)
      .withProperties([buildProperty({ id: "1" }), buildProperty({ id: "2" })])
      .build();

    const viewModel = createTestPropertiesViewModel()(state);

    expect(viewModel).toEqual({
      type: PropertiesViewModelType.PropertiesLoaded,
      properties: [buildProperty({ id: "1" }), buildProperty({ id: "2" })],
    });
  });
});
