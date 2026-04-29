import { APP_NAME } from "@/lib/constants";
import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { colors } = useEnterpriseTheme();
  const [email, setEmail] = useState("amara@summitlife.example");
  const [password, setPassword] = useState("enterprise-demo");

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.eyebrow, { color: colors.blue }]}>Premium SaaS group portal</Text>
        <Text style={[styles.title, { color: colors.text }]}>{APP_NAME}</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>Sign in to manage companies, teams, finance, fleet, policies, and analytics.</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Work email"
          placeholderTextColor={colors.textMuted}
          style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.background }]}
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
          style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.background }]}
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.blue }]} onPress={() => router.replace("/(workspace)/dashboard")}>
          <Text style={styles.buttonText}>Enter workspace</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 460,
    borderWidth: 1,
    borderRadius: 18,
    padding: 28,
    gap: 14,
    shadowColor: "#0b1630",
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 48,
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: "600",
  },
  button: {
    borderRadius: 8,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
  },
});

