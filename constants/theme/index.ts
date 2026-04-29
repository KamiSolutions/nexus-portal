import { darkColors, lightColors } from "./colors";
export { darkColors, lightColors, type ThemeColors } from "./colors";
export { darkTheme } from "./darkTheme";
export { lightTheme } from "./lightTheme";
export { radii, spacing } from "./spacing";
export { shadows } from "./shadows";
export { Fonts, typography } from "./typography";
export { themes, type ThemeMode, type ThemeTokens } from "./tokens";

const primaryBlue = lightColors.navy;
const goldAccent = "#d4af37";

export const Colors = {
  light: {
    text: lightColors.text,
    background: lightColors.background,
    tint: primaryBlue,
    icon: lightColors.textMuted,
    tabIconDefault: lightColors.textMuted,
    tabIconSelected: primaryBlue,
    primary: primaryBlue,
    accent: goldAccent,
    card: lightColors.card,
    border: lightColors.border,
    textLight: lightColors.textInverse,
  },
  dark: {
    text: darkColors.text,
    background: darkColors.background,
    tint: darkColors.blue,
    icon: darkColors.textSecondary,
    tabIconDefault: darkColors.textMuted,
    tabIconSelected: darkColors.blue,
    primary: darkColors.blue,
    accent: darkColors.amber,
    card: darkColors.card,
    border: darkColors.border,
    textLight: darkColors.text,
  },
};

