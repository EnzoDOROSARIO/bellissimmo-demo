import {
  AsyncThunk,
  Middleware,
  ThunkDispatch,
  UnknownAction,
  configureStore,
  isAsyncThunkAction,
} from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { PropertyGateway } from "./ports/property-gateway.port";
import { FakePropertyGateway } from "./infra/fake-property-gateway";

export const EMPTY_ARGS = "EMPTY_ARGS" as const;

export type Dependencies = {
  propertyGateway: PropertyGateway;
};

export const createStore = (
  dependencies: Dependencies,
  preloadedState?: Partial<RootState>,
) => {
  const actions: UnknownAction[] = [];
  const logActionsMiddleware: Middleware = () => (next) => (action) => {
    actions.push(action as UnknownAction);
    return next(action);
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }).prepend(logActionsMiddleware);
    },
    preloadedState,
  });

  return {
    ...store,
    getActions() {
      return actions;
    },
  };
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

  return {
    ...store,
    getDispatchedUseCaseArgs(useCase: AsyncThunk<any, any, any>) {
      const pendingUseCaseAction = store
        .getActions()
        .find((a) => a.type === useCase.pending.toString());

      if (!pendingUseCaseAction) return;

      if (!isAsyncThunkAction(pendingUseCaseAction)) return;

      return pendingUseCaseAction.meta.arg ?? EMPTY_ARGS;
    },
  };
};

type AppStoreWithGetActions = ReturnType<typeof createStore>;
export type AppStore = Omit<AppStoreWithGetActions, "getActions">;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, UnknownAction>;
