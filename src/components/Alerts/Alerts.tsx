import { useSelector } from "react-redux";
import { createAlertsViewModel } from "./alerts.viewmodel";
import { useToast } from "../ui/use-toast";
import { useEffect } from "react";
import { Toaster } from "../ui/toaster";
import { cn } from "@/lib/utils";

export const Alerts = () => {
  const viewModel = useSelector(createAlertsViewModel());
  const { toast } = useToast();

  useEffect(() => {
    if (viewModel.lastAlert) {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        description: viewModel.lastAlert.message,
      });
    }
  }, [viewModel.lastAlert, toast]);

  return <Toaster />;
};
