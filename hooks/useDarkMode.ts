import { useEnterpriseTheme } from "@/providers/ThemeProvider";

export function useDarkMode() {
  const { isDark, mode, setThemeMode, toggleTheme } = useEnterpriseTheme();

  return {
    isDark,
    mode,
    setDarkMode: (enabled: boolean) => setThemeMode(enabled ? "dark" : "light"),
    toggleTheme,
  };
}

