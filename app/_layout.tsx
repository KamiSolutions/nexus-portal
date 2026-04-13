// File: app/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
    Animated,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Sidebar from "./components/Sidebar";

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sidebarWidth = new Animated.Value(isCollapsed ? 60 : 220);

  const toggleSidebar = () => {
    Animated.timing(sidebarWidth, {
      toValue: isCollapsed ? 220 : 60,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Sidebar */}
        <Animated.View
          style={[styles.sidebarContainer, { width: sidebarWidth }]}
        >
          <TouchableOpacity style={styles.hamburger} onPress={toggleSidebar}>
            <Ionicons name="menu" size={28} color="#002147" />
          </TouchableOpacity>
          {/* Sidebar navigation for all modules */}
          <Sidebar collapsed={isCollapsed} />
        </Animated.View>

        {/* Main Content */}
        <View style={styles.content}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#fff",
                borderBottomColor: "#d4af37",
                borderBottomWidth: 2,
              },
              headerTintColor: "#002147",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebarContainer: {
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    paddingTop: 10,
  },
  hamburger: {
    alignItems: "center",
    marginBottom: 10,
  },
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
});
