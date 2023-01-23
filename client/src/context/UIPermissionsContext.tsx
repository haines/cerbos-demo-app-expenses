import { useQuery } from "@tanstack/react-query";
import * as React from "react";

import { UIPermissions } from "../interfaces/UIPermissions";
import { getFeaturesQuery } from "../queries/getFeaturesQuery";
import { useAuth } from "./AuthContext";
import { useStats } from "./StatsContext";

type UIPermissionsProviderProps = { children: React.ReactNode };

const UIPermissionsContext = React.createContext<UIPermissions>({
  expenses: false,
  reports: false,
  admin: false,
});

function UIPermissionsProvider({ children }: UIPermissionsProviderProps) {
  const { user } = useAuth();
  const { recordClientCheck } = useStats();

  const { data } = getFeaturesQuery();

  const [perms, setPerms] = React.useState<UIPermissions>({
    expenses: false,
    reports: false,
    admin: false,
  });

  React.useEffect(() => {
    if (data) setPerms(data);
  }, [data]);

  return (
    <UIPermissionsContext.Provider value={perms}>
      {children}
    </UIPermissionsContext.Provider>
  );
}

function useUIPermissions() {
  const context = React.useContext(UIPermissionsContext);
  if (context === undefined) {
    throw new Error(
      "useUIPermissions must be used within a UIPermissionsContext"
    );
  }
  return context;
}

export { UIPermissionsProvider, useUIPermissions };
