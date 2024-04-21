import { RootState } from "@/lib/create-store";
import { Alert } from "@/lib/models/alert.entity";
import { selectLastAlert } from "@/lib/slices/alerts.slice";

export type AlertsViewModel = {
  lastAlert: Alert;
};

export const createAlertsViewModel =
  () =>
  (state: RootState): AlertsViewModel => {
    const lastAlert = selectLastAlert(state);

    return { lastAlert };
  };
