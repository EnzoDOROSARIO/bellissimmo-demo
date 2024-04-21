import {
  ActionCreatorWithPayload,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { Property, propertiesAdapter } from "./models/property.entity";
import { rootReducer } from "./root-reducer";
import { RootState } from "./create-store";
import { Alert, alertsAdapter } from "./models/alert.entity";

const withProperties = createAction<Property[]>("withProperties");
const withAlerts = createAction<Alert[]>("withAlerts");
const withPropertiesLoading = createAction("withPropertiesLoading");
const withPropertiesNotLoading = createAction("withPropertiesNotLoading");

const initialState = rootReducer(undefined, createAction("init")());

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(withProperties, (state, action) => {
      propertiesAdapter.upsertMany(state.properties, action.payload);
    })
    .addCase(withAlerts, (state, action) => {
      alertsAdapter.upsertMany(state.alerts, action.payload);
    })
    .addCase(withPropertiesLoading, (state) => {
      state.properties.loading = true;
    })
    .addCase(withPropertiesNotLoading, (state) => {
      state.properties.loading = false;
    });
});

export const stateBuilder = (baseState = initialState) => {
  const reduce =
    <P>(actionCreator: ActionCreatorWithPayload<P>) =>
    (payload: P) => {
      return stateBuilder(reducer(baseState, actionCreator(payload)));
    };

  return {
    withProperties: reduce(withProperties),
    withAlerts: reduce(withAlerts),
    withPropertiesLoading: reduce(withPropertiesLoading),
    withPropertiesNotLoading: reduce(withPropertiesNotLoading),
    build(): RootState {
      return baseState;
    },
  };
};

export const stateBuilderProvider = () => {
  let builder = stateBuilder();
  return {
    getState() {
      return builder.build();
    },
    setState(updateFn: (_builder: StateBuilder) => StateBuilder) {
      builder = updateFn(builder);
    },
  };
};

export type StateBuilder = ReturnType<typeof stateBuilder>;
export type StateBuilderProvider = ReturnType<typeof stateBuilderProvider>;
