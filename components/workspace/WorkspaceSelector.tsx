import { StatusBadge } from "@/components/ui/StatusBadge";
import { useTenant } from "@/providers/TenantProvider";
import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function WorkspaceSelector() {
  const { activeCompany, companies, setActiveCompanyId, tenant } = useTenant();
  const { colors } = useEnterpriseTheme();

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <Text style={[styles.eyebrow, { color: colors.textMuted }]}>{tenant.groupName}</Text>
      <Text style={[styles.active, { color: colors.text }]} numberOfLines={1}>
        {activeCompany.name}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {companies.map((company) => (
          <TouchableOpacity
            key={company.id}
            style={[
              styles.chip,
              { borderColor: company.id === activeCompany.id ? company.brandColor : colors.border },
            ]}
            onPress={() => setActiveCompanyId(company.id)}
          >
            <View style={[styles.dot, { backgroundColor: company.brandColor }]} />
            <Text style={[styles.chipText, { color: colors.text }]}>{company.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <StatusBadge label={activeCompany.status} tone={activeCompany.status === "active" ? "emerald" : "amber"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  active: {
    fontSize: 16,
    fontWeight: "900",
  },
  chips: {
    gap: 8,
    paddingVertical: 2,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 99,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "800",
  },
});

