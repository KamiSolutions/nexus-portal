import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type DataPoint = {
  month: string;
  value: number;
};

export function MiniBarChart({ data }: { data: DataPoint[] }) {
  const { colors, isDark } = useEnterpriseTheme();
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <View style={styles.chart}>
      {data.map((item) => (
        <View key={item.month} style={styles.column}>
          <View style={[styles.track, { backgroundColor: isDark ? colors.hover : "#e8eef7" }]}>
            <View
              style={[
                styles.bar,
                {
                  height: `${Math.max((item.value / maxValue) * 100, 12)}%`,
                  backgroundColor: colors.blue,
                  shadowColor: colors.blue,
                  shadowOpacity: isDark ? 0.42 : 0,
                },
              ]}
            />
          </View>
          <Text style={[styles.label, { color: colors.textMuted }]}>{item.month}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    height: 190,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 14,
  },
  column: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  track: {
    height: 150,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#e8eef7",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
  },
});
