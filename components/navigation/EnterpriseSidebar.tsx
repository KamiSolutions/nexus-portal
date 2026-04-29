import { WorkspaceSelector } from "@/components/workspace/WorkspaceSelector";
import { usePermissions } from "@/providers/PermissionsProvider";
import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const navItems = [
  { label: "Dashboard", route: "/(workspace)/dashboard", icon: "grid-outline", permission: "dashboard:view" },
  { label: "Companies", route: "/(workspace)/companies", icon: "business-outline", permission: "companies:view" },
  { label: "Employees", route: "/(workspace)/employees", icon: "people-outline", permission: "employees:view" },
  { label: "Finance", route: "/(workspace)/finance", icon: "wallet-outline", permission: "finance:view" },
  { label: "HR", route: "/(workspace)/hr", icon: "id-card-outline", permission: "hr:view" },
  { label: "Vehicles", route: "/(workspace)/vehicles", icon: "car-outline", permission: "vehicles:view" },
  { label: "Claims", route: "/(workspace)/claims", icon: "shield-checkmark-outline", permission: "claims:view" },
  { label: "Policies", route: "/(workspace)/policies", icon: "documents-outline", permission: "policies:view" },
  { label: "Analytics", route: "/(workspace)/analytics", icon: "analytics-outline", permission: "analytics:view" },
  { label: "Reports", route: "/(workspace)/reports", icon: "bar-chart-outline", permission: "reports:view" },
  { label: "Billing", route: "/(workspace)/billing", icon: "card-outline", permission: "billing:view" },
  { label: "Settings", route: "/(workspace)/settings", icon: "settings-outline", permission: "settings:view" },
  { label: "User Roles", route: "/(workspace)/admin", icon: "lock-closed-outline", permission: "admin:view" },
] as const;

export function EnterpriseSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { canAccess } = usePermissions();
  const { colors } = useEnterpriseTheme();

  return (
    <View style={[styles.sidebar, { backgroundColor: colors.surface, borderRightColor: colors.border }]}>
      <View style={styles.brand}>
        <View style={[styles.logo, { backgroundColor: colors.navy }]}>
          <Text style={styles.logoText}>N</Text>
        </View>
        <View>
          <Text style={[styles.brandName, { color: colors.text }]}>Nexus Portal</Text>
          <Text style={[styles.brandSub, { color: colors.textMuted }]}>Group SaaS OS</Text>
        </View>
      </View>

      <WorkspaceSelector />

      <ScrollView contentContainerStyle={styles.nav} showsVerticalScrollIndicator={false}>
        {navItems
          .filter((item) => canAccess(item.permission))
          .map((item) => {
            const isActive = pathname.startsWith(item.route.replace("/(workspace)", ""));

            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.item, isActive && { backgroundColor: "#eaf1ff" }]}
                onPress={() => router.push(item.route)}
              >
                <Ionicons name={item.icon as any} size={19} color={isActive ? colors.blue : colors.textMuted} />
                <Text style={[styles.itemText, { color: isActive ? colors.blue : colors.text }]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: Platform.OS === "web" ? 292 : 268,
    borderRightWidth: 1,
    padding: 18,
    gap: 18,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  brandName: {
    fontSize: 16,
    fontWeight: "900",
  },
  brandSub: {
    fontSize: 12,
    fontWeight: "700",
  },
  nav: {
    gap: 6,
    paddingBottom: 32,
  },
  item: {
    minHeight: 42,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "800",
  },
});

