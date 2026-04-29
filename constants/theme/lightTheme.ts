import { lightColors } from "./colors";
import { radii, spacing } from "./spacing";
import { shadows } from "./shadows";
import { typography } from "./typography";

export const lightTheme = {
  mode: "light" as const,
  colors: lightColors,
  spacing,
  radii,
  shadows: shadows.light,
  typography,
};

