import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type DataPoint = {
  month: string;
  value: number;
};

export function MiniBarChart({ data }: { data: DataPoint[] }) {
  const { colors } = useEnterpriseTheme();
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <View style={styles.chart}>
      {data.map((item) => (
        <View key={item.month} style={styles.column}>
          <View style={styles.track}>
            <View
              style={[
                styles.bar,
                {
                  height: `${Math.max((item.value / maxValue) * 100, 12)}%`,
                  backgroundColor: colors.blue,
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
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
  },
});

