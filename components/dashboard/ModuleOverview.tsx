import { DataTable } from "@/components/tables/DataTable";
import { Surface } from "@/components/ui/Surface";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useTenant } from "@/providers/TenantProvider";
import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type ModuleOverviewProps = {
  title: string;
  subtitle: string;
  metrics: { label: string; value: string; tone?: "blue" | "emerald" | "amber" | "rose" | "slate" }[];
  rows: Record<string, unknown>[];
};

export function ModuleOverview({ title, subtitle, metrics, rows }: ModuleOverviewProps) {
  const { colors, isDark } = useEnterpriseTheme();
  const { activeCompany } = useTenant();
  const columns = Object.keys(rows[0] ?? { item: "" }).map((key) => ({
    key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()),
    width: key === "name" || key === "item" ? 220 : 150,
  }));

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={[styles.eyebrow, { color: activeCompany.brandColor }]}>{activeCompany.name}</Text>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>
        </View>
        <StatusBadge label="Tenant scoped" tone="blue" />
      </View>

      <View style={styles.metrics}>
        {metrics.map((metric) => (
          <Surface key={metric.label} style={styles.metric}>
            <StatusBadge label={metric.label} tone={metric.tone} />
            <Text style={[styles.metricValue, { color: colors.text }]}>{metric.value}</Text>
          </Surface>
        ))}
      </View>

      <Surface style={styles.workflow}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Workspace controls</Text>
        <View style={styles.workflowGrid}>
          {["Saved filters", "Export CSV", "Approval workflow", "Audit trail", "API sync", "AI summary"].map((item) => (
            <View key={item} style={[styles.workflowChip, { borderColor: colors.borderStrong, backgroundColor: isDark ? colors.hover : colors.background }]}>
              <Text style={[styles.workflowText, { color: colors.text }]}>{item}</Text>
            </View>
          ))}
        </View>
      </Surface>

      <View>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Operational register</Text>
        <DataTable columns={columns as any} rows={rows} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 18,
  },
  headerText: {
    flex: 1,
    gap: 8,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
  },
  subtitle: {
    maxWidth: 760,
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "600",
  },
  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  metric: {
    flex: 1,
    minWidth: 170,
    gap: 14,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: "900",
  },
  workflow: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
  },
  workflowGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  workflowChip: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  workflowText: {
    fontSize: 13,
    fontWeight: "800",
  },
});
