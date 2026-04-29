import { enterprisePalette } from "@/lib/constants";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  colors: typeof enterprisePalette & {
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemMode = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemMode === "dark" ? "dark" : "light");

  const value = useMemo(() => {
    const isDark = mode === "dark";

    return {
      mode,
      isDark,
      colors: {
        ...enterprisePalette,
        background: isDark ? "#07111f" : "#f6f8fb",
        surface: isDark ? "#101b33" : "#ffffff",
        text: isDark ? "#f8fafc" : "#07111f",
        textMuted: isDark ? "#a8b3c7" : "#64748b",
        border: isDark ? "#22304b" : "#dbe4ef",
      },
      toggleTheme: () => setMode((current) => (current === "dark" ? "light" : "dark")),
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

