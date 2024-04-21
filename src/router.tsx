import { createBrowserRouter } from "react-router-dom";
import { AppStore } from "./lib/create-store";
import { Home } from "./pages/Home/Home";
import { homeLoader } from "./pages/Home/home-loader";

export const createRouter = (
  { store }: { store: AppStore },
  createRouterFn = createBrowserRouter,
) => {
  return createRouterFn([
    {
      path: "/",
      element: <Home />,
      loader: homeLoader({ store }),
    },
  ]);
};

export type AppRouter = ReturnType<typeof createRouter>;
