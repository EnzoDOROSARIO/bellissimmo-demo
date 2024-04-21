import { createEntityAdapter } from "@reduxjs/toolkit";

export type Alert = {
  id: string;
  message: string;
};

export const alertsAdapter = createEntityAdapter<Alert>();
