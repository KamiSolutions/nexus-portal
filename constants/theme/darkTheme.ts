import { darkColors } from "./colors";
import { radii, spacing } from "./spacing";
import { shadows } from "./shadows";
import { typography } from "./typography";

export const darkTheme = {
  mode: "dark" as const,
  colors: darkColors,
  spacing,
  radii,
  shadows: shadows.dark,
  typography,
};

