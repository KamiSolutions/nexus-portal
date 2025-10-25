// File: app/hr/leave.tsx
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/theme';
import FileUpload from '../components/FileUpload';

type LeaveApplication = {
  id: number;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export default function LeaveScreen() {
  const [leaves, setLeaves] = useState<LeaveApplication[]>([
    { id: 1, employee: 'John Doe', type: 'Sick Leave', startDate: '2025-10-05', endDate: '2025-10-07', status: 'Pending' },
    { id: 2, employee: 'Jane Smith', type: 'Annual Leave', startDate: '2025-10-10', endDate: '2025-10-14', status: 'Approved' },
  ]);

  const [newLeave, setNewLeave] = useState({ employee: '', type: '', startDate: '', endDate: '' });
  const totalLeaves = leaves.length;

  const handleAddLeave = () => {
    if (!newLeave.employee || !newLeave.type || !newLeave.startDate || !newLeave.endDate) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const leave: LeaveApplication = {
      id: leaves.length + 1,
      employee: newLeave.employee,
      type: newLeave.type,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      status: 'Pending',
    };

    setLeaves([leave, ...leaves]);
    setNewLeave({ employee: '', type: '', startDate: '', endDate: '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leave Applications</Text>
      <Text style={styles.subtitle}>Total applications this month: {totalLeaves}</Text>
      <FileUpload />

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Employee Name"
          value={newLeave.employee}
          onChangeText={(text) => setNewLeave({ ...newLeave, employee: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Leave Type"
          value={newLeave.type}
          onChangeText={(text) => setNewLeave({ ...newLeave, type: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Start Date (YYYY-MM-DD)"
          value={newLeave.startDate}
          onChangeText={(text) => setNewLeave({ ...newLeave, startDate: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="End Date (YYYY-MM-DD)"
          value={newLeave.endDate}
          onChangeText={(text) => setNewLeave({ ...newLeave, endDate: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddLeave}>
          <Text style={styles.buttonText}>Add Leave</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {leaves.map((l) => (
          <View key={l.id} style={styles.card}>
            <Text style={styles.cardText}>Employee: {l.employee}</Text>
            <Text style={styles.cardText}>Type: {l.type}</Text>
            <Text style={styles.cardText}>Start: {l.startDate}</Text>
            <Text style={styles.cardText}>End: {l.endDate}</Text>
            <Text style={styles.cardText}>Status: {l.status}</Text>
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
