import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { AppStore } from "./lib/create-store";
import { AppRouter } from "./router";

export const Provider = ({
  store,
  router,
}: {
  store: AppStore;
  router: AppRouter;
}) => (
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
  </ReduxProvider>
);
