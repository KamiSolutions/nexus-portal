// File: app/financials/loan.tsx
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/theme';
import FileUpload from '../components/FileUpload';

type Loan = {
  id: number;
  borrower: string;
  amount: number;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
};

export default function LoansScreen() {
  const [loans, setLoans] = useState<Loan[]>([
    { id: 1, borrower: 'John Doe', amount: 5000, date: '2025-10-01', status: 'Approved' },
    { id: 2, borrower: 'Jane Smith', amount: 12000, date: '2025-10-05', status: 'Pending' },
    { id: 3, borrower: 'Mike Johnson', amount: 8000, date: '2025-10-10', status: 'Approved' },
    { id: 4, borrower: 'Sarah Lee', amount: 15000, date: '2025-10-12', status: 'Rejected' },
  ]);

  const [newLoan, setNewLoan] = useState({ borrower: '', amount: '', date: '' });

  const totalLoansThisMonth = loans.length;

  const handleAddLoan = () => {
    if (!newLoan.borrower || !newLoan.amount || !newLoan.date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const loan: Loan = {
      id: loans.length + 1,
      borrower: newLoan.borrower,
      amount: parseFloat(newLoan.amount),
      date: newLoan.date,
      status: 'Pending',
    };

    setLoans([loan, ...loans]);
    setNewLoan({ borrower: '', amount: '', date: '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Loans</Text>
      <Text style={styles.subtitle}>Total loans this month: {totalLoansThisMonth}</Text>
      <FileUpload />

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Borrower Name"
          value={newLoan.borrower}
          onChangeText={(text) => setNewLoan({ ...newLoan, borrower: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount (ZAR)"
          value={newLoan.amount}
          onChangeText={(text) => setNewLoan({ ...newLoan, amount: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={newLoan.date}
          onChangeText={(text) => setNewLoan({ ...newLoan, date: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddLoan}>
          <Text style={styles.buttonText}>Add Loan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {loans.map((loan) => (
          <View key={loan.id} style={styles.loanCard}>
            <Text style={styles.loanText}>Borrower: {loan.borrower}</Text>
            <Text style={styles.loanText}>Amount: ZAR {loan.amount.toLocaleString()}</Text>
            <Text style={styles.loanText}>Date: {loan.date}</Text>
            <Text style={styles.loanText}>Status: {loan.status}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: Fonts.web?.sans || 'system-ui',
    color: Colors.light.tint,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: Fonts.web?.sans || 'system-ui',
    color: Colors.light.text,
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontFamily: Fonts.web?.sans || 'system-ui',
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.light.tint,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.web?.sans || 'system-ui',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
  },
  loanCard: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#f0f4f7',
    borderLeftWidth: 5,
    borderLeftColor: Colors.light.tint,
  },
  loanText: {
    fontSize: 16,
    fontFamily: Fonts.web?.sans || 'system-ui',
    color: Colors.light.text,
  },
});
