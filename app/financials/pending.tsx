// File: app/financials/pending.tsx
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/theme';
import FileUpload from '../components/FileUpload';

type PendingRequest = {
  id: number;
  description: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Needs Approval';
};

export default function PendingRequestsScreen() {
  const [requests, setRequests] = useState<PendingRequest[]>([
    { id: 1, description: 'Loan Application - John Doe', amount: 5000, date: '2025-10-03', status: 'Pending' },
    { id: 2, description: 'Loan Application - Jane Smith', amount: 7500, date: '2025-10-06', status: 'Processing' },
  ]);

  const [newRequest, setNewRequest] = useState({ description: '', amount: '', date: '' });

  const totalRequests = requests.length;

  const handleAddRequest = () => {
    if (!newRequest.description || !newRequest.amount || !newRequest.date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const request: PendingRequest = {
      id: requests.length + 1,
      description: newRequest.description,
      amount: parseFloat(newRequest.amount),
      date: newRequest.date,
      status: 'Pending',
    };

    setRequests([request, ...requests]);
    setNewRequest({ description: '', amount: '', date: '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pending Financial Requests</Text>
      <Text style={styles.subtitle}>Total pending: {totalRequests}</Text>
      <FileUpload />

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newRequest.description}
          onChangeText={(text) => setNewRequest({ ...newRequest, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount (ZAR)"
          value={newRequest.amount}
          onChangeText={(text) => setNewRequest({ ...newRequest, amount: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={newRequest.date}
          onChangeText={(text) => setNewRequest({ ...newRequest, date: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddRequest}>
          <Text style={styles.buttonText}>Add Request</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {requests.map((req) => (
          <View key={req.id} style={styles.card}>
            <Text style={styles.cardText}>Description: {req.description}</Text>
            <Text style={styles.cardText}>Amount: ZAR {req.amount.toLocaleString()}</Text>
            <Text style={styles.cardText}>Date: {req.date}</Text>
            <Text style={styles.cardText}>Status: {req.status}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: Colors.light.background },
  title: { fontSize: 28, fontWeight: 'bold', fontFamily: Fonts.web?.sans || 'system-ui', color: Colors.light.tint, marginBottom: 10 },
  subtitle: { fontSize: 18, fontFamily: Fonts.web?.sans || 'system-ui', color: Colors.light.text, marginBottom: 20 },
  formContainer: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: Colors.light.tint, borderRadius: 8, padding: 10, marginBottom: 10, fontFamily: Fonts.web?.sans || 'system-ui', fontSize: 16 },
  button: { backgroundColor: Colors.light.tint, padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontFamily: Fonts.web?.sans || 'system-ui', fontWeight: 'bold', fontSize: 16 },
  listContainer: { marginTop: 20 },
  card: { padding: 15, marginBottom: 15, borderRadius: 8, backgroundColor: '#f0f4f7', borderLeftWidth: 5, borderLeftColor: Colors.light.tint },
  cardText: { fontSize: 16, fontFamily: Fonts.web?.sans || 'system-ui', color: Colors.light.text },
});
