// File: app/dashboard.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screens = [
  { name: 'Home', route: '/(tabs)/home', icon: 'home' },
  { name: 'Policies', route: '/policies', icon: 'file-tray-full' },
  { name: 'Claims', route: '/policies/claim', icon: 'document-text' },
  { name: 'Financials', route: '/financials', icon: 'cash' },
  { name: 'Loans', route: '/financials/loan', icon: 'wallet' },
  { name: 'HR', route: '/hr', icon: 'people' },
  { name: 'Contracts', route: '/hr/contracts', icon: 'document' },
  { name: 'Leave', route: '/hr/leave', icon: 'calendar' },
  { name: 'Leases', route: '/leases', icon: 'business' },
  { name: 'Vehicles', route: '/vehicles', icon: 'car' },
  { name: 'Maintenance', route: '/vehicles/maintenance', icon: 'construct' },
  { name: 'Users', route: '/users', icon: 'person' },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.grid}>
        {screens.map((screen) => (
          <TouchableOpacity
            key={screen.name}
            style={styles.card}
            onPress={() => router.push(screen.route)}
          >
            <Ionicons name={screen.icon as any} size={32} color="#002147" />
            <Text style={styles.cardText}>{screen.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#002147',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: '#002147',
    fontWeight: '500',
    textAlign: 'center',
  },
});
