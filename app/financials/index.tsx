// File: app/financials/index.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../constants/theme';

export default function FinancialsScreen() {
  const router = useRouter();

  const financialActions = [
    { name: 'Loans', route: '/financials/loan' },
    { name: 'Requisitions', route: '/financials/requisitions' },
    { name: 'Approved Financials', route: '/financials/approved' },
    { name: 'Pending Financials', route: '/financials/pending' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Financials</Text>
      {financialActions.map((action) => (
        <TouchableOpacity
          key={action.name}
          style={styles.card}
          onPress={() => router.push(action.route)}
        >
          <Text style={styles.cardText}>{action.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.light.background,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: Fonts.web?.sans || 'system-ui',
    color: Colors.light.tint,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontFamily: Fonts.web?.sans || 'system-ui',
    color: Colors.light.text,
  },
});
