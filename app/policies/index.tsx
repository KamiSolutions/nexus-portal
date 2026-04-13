/**
 * Policy & Claims Management Module
 * Insurance claims submission, tracking, and approval workflow
 * Displays open claims and their processing status
 */
// File: app/policies/index.tsx
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts } from "../../constants/theme";

export default function PoliciesScreen() {
  const router = useRouter();

  // Mock data for existing claims
  const claims = [
    { id: "1", policyNumber: "POL12345", amount: 5000, status: "Approved" },
    { id: "2", policyNumber: "POL67890", amount: 3000, status: "Pending" },
    { id: "3", policyNumber: "POL54321", amount: 10000, status: "Rejected" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Claims</Text>

      {claims.map((claim) => (
        <View key={claim.id} style={styles.card}>
          <Text style={styles.policy}>Policy Number: {claim.policyNumber}</Text>
          <Text style={styles.detail}>Amount: ${claim.amount}</Text>
          <Text
            style={[
              styles.detail,
              claim.status === "Approved"
                ? styles.approved
                : claim.status === "Pending"
                  ? styles.pending
                  : styles.rejected,
            ]}
          >
            Status: {claim.status}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/policies/claim")}
      >
        <Text style={styles.buttonText}>Submit New Claim</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: Fonts.web?.sans || "system-ui",
    color: Colors.light.tint,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  policy: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: Colors.light.text,
  },
  approved: { color: "green", fontWeight: "bold" },
  pending: { color: "orange", fontWeight: "bold" },
  rejected: { color: "red", fontWeight: "bold" },
  button: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Fonts.web?.sans || "system-ui",
  },
});
