import { useContext } from "react";
import { DashboardContextType } from "../context/dashboard/dashboard.types";
import { DashboardContext } from "../context/dashboard/dashboardContext";

const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  return context;
};

export default useDashboard;
