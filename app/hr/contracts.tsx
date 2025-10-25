// File: app/hr/contracts.tsx
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/theme';
import FileUpload from '../components/FileUpload';

type Contract = {
  id: number;
  employee: string;
  position: string;
  startDate: string;
  endDate: string;
};

export default function ContractsScreen() {
  const [contracts, setContracts] = useState<Contract[]>([
    { id: 1, employee: 'John Doe', position: 'Manager', startDate: '2024-01-01', endDate: '2025-12-31' },
    { id: 2, employee: 'Jane Smith', position: 'HR Assistant', startDate: '2024-03-15', endDate: '2025-03-14' },
  ]);

  const [newContract, setNewContract] = useState({ employee: '', position: '', startDate: '', endDate: '' });

  const totalContracts = contracts.length;

  const handleAddContract = () => {
    if (!newContract.employee || !newContract.position || !newContract.startDate || !newContract.endDate) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const contract: Contract = {
      id: contracts.length + 1,
      employee: newContract.employee,
      position: newContract.position,
      startDate: newContract.startDate,
      endDate: newContract.endDate,
    };

    setContracts([contract, ...contracts]);
    setNewContract({ employee: '', position: '', startDate: '', endDate: '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Employee Contracts</Text>
      <Text style={styles.subtitle}>Total contracts this month: {totalContracts}</Text>
      <FileUpload />

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Employee Name"
          value={newContract.employee}
          onChangeText={(text) => setNewContract({ ...newContract, employee: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Position"
          value={newContract.position}
          onChangeText={(text) => setNewContract({ ...newContract, position: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Start Date (YYYY-MM-DD)"
          value={newContract.startDate}
          onChangeText={(text) => setNewContract({ ...newContract, startDate: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="End Date (YYYY-MM-DD)"
          value={newContract.endDate}
          onChangeText={(text) => setNewContract({ ...newContract, endDate: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddContract}>
          <Text style={styles.buttonText}>Add Contract</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {contracts.map((c) => (
          <View key={c.id} style={styles.card}>
            <Text style={styles.cardText}>Employee: {c.employee}</Text>
            <Text style={styles.cardText}>Position: {c.position}</Text>
            <Text style={styles.cardText}>Start: {c.startDate}</Text>
            <Text style={styles.cardText}>End: {c.endDate}</Text>
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
