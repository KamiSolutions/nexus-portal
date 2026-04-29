import { useEnterpriseTheme } from "@/providers/ThemeProvider";

export function useColors() {
  return useEnterpriseTheme().colors;
}

