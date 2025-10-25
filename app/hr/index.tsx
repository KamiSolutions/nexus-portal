// File: app/hr/index.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/theme';

export default function HRScreen() {
  const router = useRouter();

  const totalRequests = 12; // Mock total HR requests this month

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>HR Dashboard</Text>
      <Text style={styles.subtitle}>Total requests this month: {totalRequests}</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/hr/leave')}>
          <Text style={styles.menuText}>Leave Applications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/hr/contracts')}>
          <Text style={styles.menuText}>Employee Contracts</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: Colors.light.background },
  title: { fontSize: 28, fontWeight: 'bold',
    fontFamily: Fonts.web?.sans || 'system-ui', 
    color: Colors.light.tint, marginBottom: 10 },
  subtitle: { fontSize: 18, fontFamily: Fonts.web?.sans || 'system-ui', 
    color: Colors.light.text, marginBottom: 20 },
  menuContainer: { marginTop: 20 },
  menuButton: { 
    padding: 15, 
    marginBottom: 15, 
    backgroundColor: '#f0f4f7', 
    borderRadius: 8, 
    borderLeftWidth: 5, 
    borderLeftColor: Colors.light.tint },
    menuText: { fontSize: 16, 
    fontFamily: Fonts.web?.sans || 'system-ui', 
    color: Colors.light.text },
});
