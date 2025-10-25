// File: app/leases/index.tsx
import React, { useState } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/theme';
import FileUpload from '../components/FileUpload';

// Import images
const building1 = require('../../assets/images/building_1.jpeg');
const building2 = require('../../assets/images/building_2.jpeg');
const building3 = require('../../assets/images/building_3.webp');

const images = [building1, building2, building3];

type Property = {
  id: number;
  name: string;
  location: string;
  address: string;
  yearsOccupied: string;
  contractEnd: string;
  image: any;
};

export default function LeasesScreen() {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      name: 'Summit House',
      location: 'Johannesburg',
      address: '45 Rivonia Road, Sandton, Johannesburg',
      yearsOccupied: '3 years',
      contractEnd: '31 Dec 2026',
      image: building1,
    },
    {
      id: 2,
      name: 'Sunset Office',
      location: 'Cape Town',
      address: '12 Bree Street, City Centre, Cape Town',
      yearsOccupied: '5 years',
      contractEnd: '30 Jun 2027',
      image: building2,
    },
    {
      id: 3,
      name: 'Riverside Towers',
      location: 'Durban',
      address: '100 Riverside Drive, Umhlanga, Durban',
      yearsOccupied: '-',
      contractEnd: '-',
      image: building3,
    },
  ]);

  const [newProperty, setNewProperty] = useState({ name: '', location: '' });
  const totalProperties = properties.length;

  const handleAddProperty = () => {
    if (!newProperty.name || !newProperty.location) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const newProp: Property = {
      id: properties.length + 1,
      name: newProperty.name,
      location: newProperty.location,
      address: 'Address pending...',
      yearsOccupied: '-',
      contractEnd: '-',
      image: randomImage,
    };

    setProperties([newProp, ...properties]);
    setNewProperty({ name: '', location: '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leased Properties</Text>
      <Text style={styles.subtitle}>Total Properties: {totalProperties}</Text>

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <View style={styles.info}>
              <Text style={styles.propertyName}>{item.name}</Text>
              <Text style={styles.detail}>📍 {item.location}</Text>
              <Text style={styles.detail}>🏠 {item.address}</Text>
              <Text style={styles.detail}>⏳ Occupied: {item.yearsOccupied}</Text>
              <Text style={styles.detail}>📅 Contract Ends: {item.contractEnd}</Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />

      <View style={styles.uploadSection}>
        <Text style={styles.uploadTitle}>Add New Property</Text>
        <FileUpload />
        <TextInput
          style={styles.input}
          placeholder="Property Name"
          value={newProperty.name}
          onChangeText={(text) => setNewProperty({ ...newProperty, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={newProperty.location}
          onChangeText={(text) => setNewProperty({ ...newProperty, location: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddProperty}>
          <Text style={styles.buttonText}>Add Property</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    fontSize: 16,
    fontFamily: Fonts.web?.sans || 'system-ui',
    color: Colors.light.text,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 130,
    height: 130,
  },
  info: {
    flex: 1,
    padding: 12,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 2,
  },
  uploadSection: {
    marginTop: 30,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginBottom: 10,
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
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
