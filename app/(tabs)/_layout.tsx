// File: app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // We have our sidebar header
        tabBarStyle: { height: 0 }, // Hide bottom tab bar
      }}
    />
  );
}
