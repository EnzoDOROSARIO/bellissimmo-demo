import { ThunkDispatch, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { PropertyGateway } from "./ports/property-gateway.port";
import { FakePropertyGateway } from "./infra/fake-property-gateway";

export type Dependencies = {
  propertyGateway: PropertyGateway;
};

export const createStore = (
  dependencies: Dependencies,
  preloadedState?: Partial<RootState>,
) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      });
    },
    preloadedState,
  });

  return { ...store };
};

export const createTestStore = (
  { propertyGateway = new FakePropertyGateway() }: Partial<Dependencies> = {},
  preloadedState: Partial<RootState> = {},
) => {
  const store = createStore(
    {
      propertyGateway,
    },
    preloadedState,
  );

  return { ...store };
};

type AppStoreWithGetActions = ReturnType<typeof createStore>;
export type AppStore = Omit<AppStoreWithGetActions, "getActions">;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, UnknownAction>;
