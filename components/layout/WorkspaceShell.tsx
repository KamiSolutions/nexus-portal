import { EnterpriseSidebar } from "@/components/navigation/EnterpriseSidebar";
import { TopNav } from "@/components/navigation/TopNav";
import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import React from "react";
import { Platform, StyleSheet, View, useWindowDimensions } from "react-native";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  const { colors } = useEnterpriseTheme();
  const showSidebar = width >= 920;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {showSidebar && <EnterpriseSidebar />}
      <View style={styles.main}>
        <TopNav />
        <View style={[styles.content, Platform.OS !== "web" && styles.mobileContent]}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  mobileContent: {
    padding: 14,
  },
});

