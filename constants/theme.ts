/**
 * Theme colors and fonts for Kusile Group Portal
 * Colors are based on https://www.summitins.insure/
 */

import { Platform } from 'react-native';

const primaryBlue = '#002147'; // main dark blue
const goldAccent = '#d4af37'; // gold accent
const lightGray = '#f8f8f8';   // background light gray
const textDark = '#11181C';    // primary text
const textLight = '#fff';      // white text

export const Colors = {
  light: {
    text: textDark,
    background: lightGray,
    tint: primaryBlue,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primaryBlue,
    primary: primaryBlue,
    accent: goldAccent,
    card: '#fff',
    border: '#e0e0e0',
  },
  dark: {
    text: textLight,
    background: '#151718',
    tint: primaryBlue,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryBlue,
    primary: primaryBlue,
    accent: goldAccent,
    card: '#1f1f1f',
    border: '#333',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
