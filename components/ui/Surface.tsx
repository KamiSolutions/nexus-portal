import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

type SurfaceProps = ViewProps & {
  elevated?: boolean;
  padded?: boolean;
};

export function Surface({ style, elevated = true, padded = true, ...props }: SurfaceProps) {
  const { colors } = useEnterpriseTheme();

  return (
    <View
      {...props}
      style={[
        styles.base,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowOpacity: elevated ? 0.08 : 0,
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
    shadowColor: "#0b1630",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 28,
    elevation: 3,
  },
  padded: {
    padding: 18,
  },
});

