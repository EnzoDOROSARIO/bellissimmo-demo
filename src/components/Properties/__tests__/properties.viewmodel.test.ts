import { describe, expect, test, vitest } from "vitest";
import { AppDispatch, RootState, createTestStore } from "@/lib/create-store";
import { stateBuilder } from "@/lib/state-builder";
import {
  PropertiesViewModelType,
  createPropertiesViewModel,
} from "../properties.viewmodel";
import { buildProperty } from "@/lib/__tests__/property.builder";
import { addToFavorites } from "@/lib/usecases/add-to-favorites.usecase";

const createTestPropertiesViewModel =
  ({ dispatch = vitest.fn() }: { dispatch?: AppDispatch }) =>
  (rootState: RootState) =>
    createPropertiesViewModel({ dispatch })(rootState);

describe("Properties view model", () => {
  test("it should return a loading state when properties are loading", () => {
    const state = stateBuilder().withPropertiesLoading(undefined).build();

    const viewModel = createTestPropertiesViewModel({})(state);

    expect(viewModel).toEqual({
      type: PropertiesViewModelType.PropertiesLoading,
    });
  });

  test("it should display properties when they are loaded", () => {
    const state = stateBuilder()
      .withPropertiesNotLoading(undefined)
      .withProperties([buildProperty({ id: "1" }), buildProperty({ id: "2" })])
      .build();

    const viewModel = createTestPropertiesViewModel({})(state);

    expect(viewModel).toEqual({
      ...viewModel,
      type: PropertiesViewModelType.PropertiesLoaded,
      properties: [buildProperty({ id: "1" }), buildProperty({ id: "2" })],
    });
  });

  test("it should call the addToFavorites use case on click", async () => {
    const state = stateBuilder().withPropertiesNotLoading(undefined).build();
    const store = createTestStore({}, state);
    const viewModel = createTestPropertiesViewModel({
      dispatch: store.dispatch,
    })(store.getState());
    const p = buildProperty({ id: "1" });

    if (viewModel.type === PropertiesViewModelType.PropertiesLoaded)
      await viewModel.handleAddToFavorites(p);

    expect(store.getDispatchedUseCaseArgs(addToFavorites)).toEqual(p);
  });
});
