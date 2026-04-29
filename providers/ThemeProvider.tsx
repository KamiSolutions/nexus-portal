import { themes, type ThemeMode, type ThemeTokens } from "@/constants/theme";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  theme: ThemeTokens;
  colors: ThemeTokens["colors"];
  spacing: ThemeTokens["spacing"];
  radii: ThemeTokens["radii"];
  shadows: ThemeTokens["shadows"];
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemMode = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemMode === "dark" ? "dark" : "light");

  const value = useMemo(() => {
    const isDark = mode === "dark";
    const theme = themes[mode];

    return {
      mode,
      isDark,
      theme,
      colors: theme.colors,
      spacing: theme.spacing,
      radii: theme.radii,
      shadows: theme.shadows,
      toggleTheme: () => setMode((current) => (current === "dark" ? "light" : "dark")),
      setThemeMode: setMode,
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useEnterpriseTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useEnterpriseTheme must be used inside ThemeProvider");
  }

  return context;
}
