// File: app/(tabs)/explore.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/theme';

export default function ExploreScreen() {
  const router = useRouter();

  const quickLinks = [
    { title: '💼 Financials', route: '/financials', description: 'View loans, requisitions, and approvals' },
    { title: '🧍‍♂️ HR', route: '/hr', description: 'Manage contracts and leave requests' },
    { title: '🚗 Vehicles', route: '/vehicles', description: 'Track fleet, mileage, and maintenance' },
    { title: '🏢 Leases', route: '/leases', description: 'Manage company properties and lease terms' },
    { title: '📜 Policies', route: '/policies', description: 'Submit claims and view company policies' },
    { title: '👥 Users', route: '/users', description: 'View employees and department heads' },
  ];

  const insights = [
    { label: 'Active Employees', value: 24 },
    { label: 'Pending Leave Requests', value: 3 },
    { label: 'Fleet Vehicles', value: 4 },
    { label: 'Properties Managed', value: 3 },
    { label: 'Approved Loans (Oct)', value: 'R120,000' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explore Kusile Group Portal</Text>
      <Text style={styles.subtitle}>
        Get an overview of operations and access key management sections.
      </Text>

      <View style={styles.insightContainer}>
        {insights.map((item, index) => (
          <View key={index} style={styles.insightCard}>
            <Text style={styles.insightValue}>{item.value}</Text>
            <Text style={styles.insightLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Quick Access</Text>
      <View style={styles.quickLinksContainer}>
        {quickLinks.map((link, index) => (
          <TouchableOpacity
            key={index}
            style={styles.linkCard}
            onPress={() => router.push(link.route)}
          >
            <Text style={styles.linkTitle}>{link.title}</Text>
            <Text style={styles.linkDescription}>{link.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Did You Know?</Text>
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>
          You can upload documents directly from each module — for example, vehicle service receipts,
          lease contracts, or financial requisitions.{"\n\n"}
          This helps ensure all records stay updated and accessible in real time.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.light.tint,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: Fonts.web?.sans || 'system-ui',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: Fonts.web?.sans || 'system-ui',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginBottom: 10,
    marginTop: 25,
    fontFamily: Fonts.web?.sans || 'system-ui',
  },
  insightContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  insightCard: {
    width: '48%',
    backgroundColor: '#f0f4f7',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.tint,
  },
  insightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.tint,
    fontFamily: Fonts.web?.sans || 'system-ui',
  },
  insightLabel: {
    fontSize: 14,
    color: Colors.light.text,
    marginTop: 5,
    textAlign: 'center',
  },
  quickLinksContainer: {
    marginTop: 10,
  },
  linkCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.tint,
    fontFamily: Fonts.web?.sans || 'system-ui',
  },
  linkDescription: {
    fontSize: 14,
    color: Colors.light.text,
    marginTop: 5,
  },
  tipContainer: {
    backgroundColor: '#e8f7ff',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.tint,
  },
  tipText: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 22,
    fontFamily: Fonts.web?.sans || 'system-ui',
  },
});
