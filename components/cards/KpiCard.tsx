import { Surface } from "@/components/ui/Surface";
import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type KpiCardProps = {
  label: string;
  value: string;
  delta: string;
  tone?: "blue" | "emerald" | "cyan" | "amber";
};

export function KpiCard({ label, value, delta, tone = "blue" }: KpiCardProps) {
  const { colors, isDark } = useEnterpriseTheme();

  return (
    <Surface style={[styles.card, isDark && { backgroundColor: colors.card, borderColor: colors.borderStrong }]}>
      <View
        style={[
          styles.marker,
          {
            backgroundColor: colors[tone],
            shadowColor: colors[tone],
            shadowOpacity: isDark ? 0.52 : 0,
          },
        ]}
      />
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      <View style={styles.row}>
        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        <Text style={[styles.delta, { color: delta.startsWith("-") ? colors.emerald : colors.blue }]}>
          {delta}
        </Text>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 190,
    flex: 1,
    gap: 10,
  },
  marker: {
    width: 34,
    height: 4,
    borderRadius: 999,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
  },
  value: {
    fontSize: 27,
    fontWeight: "900",
  },
  delta: {
    fontSize: 13,
    fontWeight: "800",
    paddingBottom: 3,
  },
});
