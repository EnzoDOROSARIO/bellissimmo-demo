import { AppStore } from "@/lib/create-store";
import { getProperties } from "@/lib/usecases/get-properties.usecase";
import { LoaderFunction } from "react-router-dom";

export const homeLoader =
  ({ store }: { store: AppStore }): LoaderFunction =>
  () => {
    store.dispatch(getProperties());
    return null;
  };
