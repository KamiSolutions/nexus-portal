import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type StatusBadgeProps = {
  label: string;
  tone?: "blue" | "emerald" | "amber" | "rose" | "slate";
};

export function StatusBadge({ label, tone = "slate" }: StatusBadgeProps) {
  const { colors, isDark } = useEnterpriseTheme();
  const tones = {
    blue: { bg: isDark ? "rgba(79, 140, 255, 0.18)" : "#dbeafe", fg: colors.blue },
    emerald: { bg: isDark ? "rgba(61, 213, 152, 0.16)" : "#d1fae5", fg: colors.emerald },
    amber: { bg: isDark ? "rgba(255, 181, 71, 0.16)" : "#fef3c7", fg: colors.amber },
    rose: { bg: isDark ? "rgba(255, 107, 107, 0.16)" : "#ffe4e6", fg: colors.rose },
    slate: { bg: isDark ? "rgba(182, 194, 217, 0.12)" : "#e2e8f0", fg: colors.textSecondary },
  };

  return (
    <View style={[styles.badge, { backgroundColor: tones[tone].bg, borderColor: isDark ? colors.borderStrong : "transparent" }]}>
      <Text style={[styles.text, { color: tones[tone].fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
});
