import { describe, test, expect } from "vitest";
import { buildProperty } from "@/lib/__tests__/property.builder";
import { stateBuilder } from "@/lib/state-builder";
import { RootState } from "@/lib/create-store";
import { createFavoritesViewModel } from "../favorites.viewmodel";

const createTestFavoritesViewModel = () => (rootState: RootState) =>
  createFavoritesViewModel()(rootState);

describe("Favorites view model", () => {
  test("it should show the list of favorites", () => {
    const state = stateBuilder()
      .withProperties([
        buildProperty({ id: "1", isFavorite: true }),
        buildProperty({ id: "2" }),
        buildProperty({ id: "3" }),
      ])
      .build();

    const viewModel = createTestFavoritesViewModel()(state);

    expect(viewModel).toEqual({
      favorites: [buildProperty({ id: "1", isFavorite: true })],
    });
  });
});
