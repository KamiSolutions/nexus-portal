/**
 * File Upload Component
 * Provides document picker functionality for file uploads across the application
 * Uses expo-document-picker for secure file selection
 */
// File: app/components/FileUpload.tsx
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../constants/theme";

type FileUploadProps = {
  label?: string;
  onFileSelected?: (file: DocumentPicker.DocumentPickerAsset) => void;
  onFileSelect?: (file: DocumentPicker.DocumentPickerAsset) => void;
};

export default function FileUpload({
  label = "Upload File",
  onFileSelected,
  onFileSelect,
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
      });
      if (!result.canceled) {
        const file = result.assets[0];
        setFileName(file.name);
        onFileSelected?.(file);
        onFileSelect?.(file);
      }
    } catch (error) {
      console.log("File picker error:", error);
      Alert.alert("Error", "Could not select file.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>
          {fileName ? fileName : "Select File"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    marginBottom: 5,
    color: Colors.light.text,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: Fonts.sans,
    color: "#fff",
    fontSize: 14,
  },
});
