/**
 * Vehicle Management Module
 * Fleet tracking, maintenance schedules, and vehicle assignments
 * Displays vehicle inventory with mileage and service due dates
 */
// File: app/vehicles/index.tsx
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts } from "../../constants/theme";
import FileUpload from "../components/FileUpload";

const vehicles = [
  {
    id: "1",
    name: "Toyota Etios",
    image: require("../../assets/images/etios.jpg"),
    mileage: "85,200 km",
    year: 2019,
    plate: "CA 123-456",
    nextService: "15 Nov 2025",
    licenseExpiry: "30 Apr 2026",
  },
  {
    id: "2",
    name: "Ford Raptor",
    image: require("../../assets/images/raptor.webp"),
    mileage: "42,000 km",
    year: 2022,
    plate: "ND 987-654",
    nextService: "12 Dec 2025",
    licenseExpiry: "15 May 2026",
  },
  {
    id: "3",
    name: "Toyota Quantum",
    image: require("../../assets/images/toyota-quantum.jpg"),
    mileage: "152,300 km",
    year: 2018,
    plate: "GP 321-765",
    nextService: "28 Jan 2026",
    licenseExpiry: "31 Mar 2026",
  },
  {
    id: "4",
    name: "Mercedes-Benz V-Class",
    image: require("../../assets/images/vclass.jpeg"),
    mileage: "63,400 km",
    year: 2021,
    plate: "CW 654-321",
    nextService: "10 Feb 2026",
    licenseExpiry: "22 Jul 2026",
  },
];

export default function VehiclesScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Company Vehicles</Text>
      <Text style={styles.subtitle}>Total Vehicles: {vehicles.length}</Text>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.vehicleName}>{item.name}</Text>
              <Text style={styles.detail}>Year: {item.year}</Text>
              <Text style={styles.detail}>Mileage: {item.mileage}</Text>
              <Text style={styles.detail}>Plate: {item.plate}</Text>
              <Text style={styles.detail}>
                Next Service: {item.nextService}
              </Text>
              <Text style={styles.detail}>
                License Disk Expiry: {item.licenseExpiry}
              </Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />

      <View style={styles.uploadContainer}>
        <Text style={styles.uploadTitle}>Add New Vehicle</Text>
        <FileUpload
          onFileSelect={(file) => console.log("Vehicle file uploaded:", file)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/vehicles/maintenance")}
      >
        <Text style={styles.buttonText}>View Maintenance Records</Text>
      </TouchableOpacity>
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
    fontWeight: "bold",
    fontFamily: Fonts.web?.sans || "system-ui",
    color: Colors.light.tint,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.web?.sans || "system-ui",
    color: Colors.light.text,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
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
  vehicleName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 2,
  },
  uploadContainer: {
    marginTop: 30,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
