/**
 * Core Color Palette for Nexus Portal
 * Enterprise-focused color system supporting light and dark modes
 */

export const Colors = {
  // Primary brand colors
  primary: '#0f2b5b',      // Deep corporate blue
  accent: '#2563eb',       // Bright action blue
  
  // Semantic colors
  success: '#16a34a',      // Green for approvals / completed
  warning: '#d97706',      // Amber for pending / caution
  danger: '#dc2626',       // Red for rejections / errors
  info: '#0ea5e9',         // Sky blue for information
  
  // Surfaces & backgrounds
  surface: '#f8fafc',      // Light background
  surfaceDark: '#0f172a',  // Dark background
  card: '#ffffff',         // Card/elevated surfaces
  cardDark: '#1e293b',     // Dark card surfaces
  
  // Text colors
  text: '#1e293b',         // Primary text (near black)
  textSecondary: '#64748b',// Secondary text (gray)
  textLight: '#ffffff',    // Light text for dark backgrounds
  
  // Borders & dividers
  border: '#e2e8f0',       // Light border
  borderDark: '#334155',   // Dark border
  divider: '#cbd5e1',      // Divider color
  
  // Status-specific
  approved: '#166534',     // Deep green
  rejected: '#7f1d1d',     // Deep red
  pending: '#92400e',      // Deep amber
  active: '#065f46',       // Emerald
  inactive: '#4b5563',     // Gray-slate
};

/**
 * Light mode color scheme
 */
export const LightColors = {
  ...Colors,
  background: Colors.surface,
  text: Colors.text,
  textSecondary: Colors.textSecondary,
  border: Colors.border,
  card: Colors.card,
};

/**
 * Dark mode color scheme
 */
export const DarkColors = {
  ...Colors,
  background: Colors.surfaceDark,
  text: Colors.textLight,
  textSecondary: '#cbd5e1',
  border: Colors.borderDark,
  card: Colors.cardDark,
};

/**
 * Component-specific color tokens
 */
export const ComponentColors = {
  button: {
    primary: Colors.primary,
    secondary: Colors.accent,
    success: Colors.success,
    danger: Colors.danger,
  },
  badge: {
    success: Colors.success,
    warning: Colors.warning,
    danger: Colors.danger,
    info: Colors.info,
    neutral: Colors.textSecondary,
  },
  table: {
    headerBackground: Colors.primary,
    headerText: Colors.textLight,
    rowAlternate: '#f1f5f9',
    borderColor: Colors.border,
  },
};
