import React from "react";
import ReactDOM from "react-dom/client";
import "./index.d.ts";
import { Provider } from "./Provider.tsx";
import { FakePropertyGateway } from "./lib/infra/fake-property-gateway.ts";
import { createStore } from "./lib/create-store.ts";
import { createRouter } from "./router.tsx";
import { properties } from "./lib/fake-data.ts";

const fakePropertiesGateway = new FakePropertyGateway(500);
fakePropertiesGateway.properties = properties;

const store = createStore({
  propertyGateway: fakePropertiesGateway,
});

const router = createRouter({
  store,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store} router={router} />
  </React.StrictMode>,
);
