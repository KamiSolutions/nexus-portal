import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type ThemeMode = keyof typeof themes;
export type ThemeTokens = (typeof themes)[ThemeMode];
