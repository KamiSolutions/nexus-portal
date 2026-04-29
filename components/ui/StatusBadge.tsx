import { enterprisePalette } from "@/lib/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type StatusBadgeProps = {
  label: string;
  tone?: "blue" | "emerald" | "amber" | "rose" | "slate";
};

const tones = {
  blue: { bg: "#dbeafe", fg: enterprisePalette.blue },
  emerald: { bg: "#d1fae5", fg: enterprisePalette.emerald },
  amber: { bg: "#fef3c7", fg: enterprisePalette.amber },
  rose: { bg: "#ffe4e6", fg: enterprisePalette.rose },
  slate: { bg: "#e2e8f0", fg: enterprisePalette.slate },
};

export function StatusBadge({ label, tone = "slate" }: StatusBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: tones[tone].bg }]}>
      <Text style={[styles.text, { color: tones[tone].fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
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

