import { useEnterpriseTheme } from "@/providers/ThemeProvider";

export function useSpacing() {
  return useEnterpriseTheme().spacing;
}

