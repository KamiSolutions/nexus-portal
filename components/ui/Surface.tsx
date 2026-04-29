import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

type SurfaceProps = ViewProps & {
  elevated?: boolean;
  padded?: boolean;
};

export function Surface({ style, elevated = true, padded = true, ...props }: SurfaceProps) {
  const { colors, isDark } = useEnterpriseTheme();

  return (
    <View
      {...props}
      style={[
        styles.base,
        {
          backgroundColor: isDark ? colors.card : colors.surface,
          borderColor: colors.border,
          shadowColor: isDark ? "#000000" : colors.shadow,
          shadowOpacity: elevated ? (isDark ? 0.34 : 0.1) : 0,
          shadowRadius: isDark ? 34 : 28,
          elevation: elevated ? (isDark ? 8 : 3) : 0,
        },
        padded && styles.padded,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 12 },
  },
  padded: {
    padding: 18,
  },
});
