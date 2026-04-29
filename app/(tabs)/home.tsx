/**
 * Tabs Home Screen
 * Primary home/dashboard view for authenticated users
 */
import { useRouter } from "expo-router";
import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants/theme";

// Import local images
//const summitLife = require("../../assets/images/summit_life.png");
//const kfs = require("../../assets/images/KFS.png");
//const kfm = require("../../assets/images/KFM.png");

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Nexus Group Portal</Text>
      <Text style={styles.subtitle}>
        Your unified internal management platform for finance, HR, vehicles, and
        leases — all in one secure and simple place.
      </Text>

      <Text style={styles.description}>
        This web app provides a centralized space for Nexus operations —
        allowing staff to manage financial requisitions, leases, HR processes,
        and company vehicles efficiently.{"\n\n"}
        Department heads can upload important documents, track requests, and
        approve submissions in real time.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Dashboard"
          color={Colors.light.tint}
          onPress={() => router.push("/dashboard")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.light.tint,
    textAlign: "center",
    fontFamily: Fonts.web?.sans || "system-ui",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    fontFamily: Fonts.web?.sans || "system-ui",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 25,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  description: {
    fontSize: 15,
    color: Colors.light.text,
    textAlign: "center",
    fontFamily: Fonts.web?.sans || "system-ui",
    lineHeight: 22,
    marginBottom: 30,
  },
  buttonContainer: {
    width: "60%",
  },
});
