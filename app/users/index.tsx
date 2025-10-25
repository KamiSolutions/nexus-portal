// File: app/users/index.tsx
import React, { useState } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors, Fonts } from '../../constants/theme';
import FileUpload from '../components/FileUpload';

export default function UsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'John Moyo',
      department: 'Human Resources',
      position: 'Head of HR',
      access: ['HR', 'Finance', 'Users'],
      isHead: true,
    },
    {
      id: '2',
      name: 'Sarah Ncube',
      department: 'Finance',
      position: 'Accountant',
      access: ['Finance'],
      isHead: false,
    },
    {
      id: '3',
      name: 'Peter Dlamini',
      department: 'Logistics',
      position: 'Fleet Manager',
      access: ['Vehicles', 'Maintenance'],
      isHead: true,
    },
    {
      id: '4',
      name: 'Linda Khumalo',
      department: 'Operations',
      position: 'Operations Officer',
      access: ['Leases', 'Vehicles'],
      isHead: false,
    },
    {
      id: '5',
      name: 'Blessings Banda',
      department: 'IT',
      position: 'Systems Administrator',
      access: ['All Modules'],
      isHead: true,
    },
  ]);

  // Filter employees based on search input
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Employees & Access Control</Text>
      <Text style={styles.subtitle}>
        Manage user access and departmental roles
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or department..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={styles.count}>
        Total Employees: {filteredUsers.length}
      </Text>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.isHead && styles.headCard]}>
            <View style={styles.rowBetween}>
              <Text style={styles.name}>{item.name}</Text>
              {item.isHead && <Text style={styles.headBadge}>DEPT HEAD</Text>}
            </View>
            <Text style={styles.detail}>
              <Text style={styles.label}>Department:</Text> {item.department}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Position:</Text> {item.position}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Access:</Text> {item.access.join(', ')}
            </Text>
          </View>
        )}
      />

      <View style={styles.uploadSection}>
        <Text style={styles.uploadLabel}>Upload New Employee Data:</Text>
        <FileUpload />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => alert('Add new employee feature coming soon!')}
      >
        <Text style={styles.addButtonText}>+ Add Employee</Text>
      </TouchableOpacity>
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
    color: Colors.light.tint,
    fontFamily: Fonts.web?.sans || 'system-ui',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: Fonts.web?.sans || 'system-ui',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 15,
  },
  count: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headCard: {
    borderColor: Colors.light.tint,
    borderWidth: 1.5,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  headBadge: {
    backgroundColor: Colors.light.tint,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: Colors.light.text,
    marginTop: 5,
  },
  label: {
    fontWeight: '600',
    color: Colors.light.tint,
  },
  uploadSection: {
    marginTop: 30,
    marginBottom: 15,
  },
  uploadLabel: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: Colors.light.tint,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
