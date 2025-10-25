// File: app/components/Sidebar.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SidebarProps = {
  collapsed: boolean;
};

const menuItems = [
  { name: 'Dashboard', icon: 'home', route: '/(tabs)/dashboard' },
  { name: 'Policies', icon: 'file-tray-full', route: '/policies' },
  { name: 'Financials', icon: 'cash', route: '/financials' },
  { name: 'HR', icon: 'people', route: '/hr' },
  { name: 'Leases', icon: 'business', route: '/leases' },
  { name: 'Vehicles', icon: 'car', route: '/vehicles' },
  { name: 'Users', icon: 'person', route: '/users' },
];

export default function Sidebar({ collapsed }: SidebarProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[styles.menuItem, collapsed && styles.menuItemCollapsed]}
          onPress={() => router.push(item.route)}
        >
          <Ionicons name={item.icon as any} size={24} color="#002147" />
          {!collapsed && <Text style={styles.menuText}>{item.name}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginVertical: 4,
    backgroundColor: '#f0f0f0',
  },
  menuItemCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#002147',
    fontWeight: '500',
  },
});
