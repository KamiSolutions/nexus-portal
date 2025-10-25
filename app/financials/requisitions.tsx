// File: app/financials/index.tsx
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/theme';
import FileUpload from '../components/FileUpload';

type Requisition = {
  id: number;
  title: string;
  amount: number;
  date: string;
  approved: boolean;
};

export default function RequisitionsScreen() {
  const [requisitions, setRequisitions] = useState<Requisition[]>([
    { id: 1, title: 'Stationery', amount: 1200, date: '2025-10-01', approved: true },
    { id: 2, title: 'Office Chairs', amount: 4500, date: '2025-10-05', approved: false },
  ]);

  const [newReq, setNewReq] = useState({ title: '', amount: '', date: '' });

  const totalRequisitions = requisitions.length;

  const handleAddRequisition = () => {
    if (!newReq.title || !newReq.amount || !newReq.date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const req: Requisition = {
      id: requisitions.length + 1,
      title: newReq.title,
      amount: parseFloat(newReq.amount),
      date: newReq.date,
      approved: false,
    };

    setRequisitions([req, ...requisitions]);
    setNewReq({ title: '', amount: '', date: '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Requisitions</Text>
      <Text style={styles.subtitle}>Total requisitions: {totalRequisitions}</Text>
      <FileUpload />

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Requisition Title"
          value={newReq.title}
          onChangeText={(text) => setNewReq({ ...newReq, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount (ZAR)"
          value={newReq.amount}
          onChangeText={(text) => setNewReq({ ...newReq, amount: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={newReq.date}
          onChangeText={(text) => setNewReq({ ...newReq, date: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddRequisition}>
          <Text style={styles.buttonText}>Add Requisition</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {requisitions.map((req) => (
          <View key={req.id} style={styles.card}>
            <Text style={styles.cardText}>Title: {req.title}</Text>
            <Text style={styles.cardText}>Amount: ZAR {req.amount.toLocaleString()}</Text>
            <Text style={styles.cardText}>Date: {req.date}</Text>
            <Text style={styles.cardText}>Approved: {req.approved ? 'Yes' : 'No'}</Text>
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
