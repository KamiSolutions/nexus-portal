/**
 * Legacy Theme colors and fonts for Nexus Portal
 * Note: For new components, prefer constants/colors.ts for the enterprise color palette
 */

const primaryBlue = "#002147"; // main dark blue
const goldAccent = "#d4af37"; // gold accent
const lightGray = "#f8f8f8"; // background light gray
const textDark = "#11181C"; // primary text
const textLight = "#fff"; // white text

export const Colors = {
  light: {
    text: textDark,
    background: lightGray,
    tint: primaryBlue,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: primaryBlue,
    primary: primaryBlue,
    accent: goldAccent,
    card: "#fff",
    border: "#e0e0e0",
    textLight,
  },
  dark: {
    text: textLight,
    background: "#151718",
    tint: primaryBlue,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primaryBlue,
    primary: primaryBlue,
    accent: goldAccent,
    card: "#1f1f1f",
    border: "#333",
    textLight,
  },
};

export const Fonts = {
  sans: "system-ui",
  serif: "ui-serif",
  rounded: "ui-rounded",
  mono: "ui-monospace",
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
};
