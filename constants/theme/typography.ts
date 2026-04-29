export const Fonts = {
  sans: "system-ui",
  serif: "ui-serif",
  rounded: "ui-rounded",
  mono: "ui-monospace",
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
};

export const typography = {
  heading: {
    fontWeight: "900" as const,
    letterSpacing: 0,
  },
  body: {
    fontWeight: "600" as const,
    letterSpacing: 0,
  },
  label: {
    fontWeight: "800" as const,
    letterSpacing: 0.2,
  },
};

