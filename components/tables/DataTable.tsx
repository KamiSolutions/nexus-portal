import { Surface } from "@/components/ui/Surface";
import { useEnterpriseTheme } from "@/providers/ThemeProvider";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export type DataTableColumn<T> = {
  key: keyof T;
  label: string;
  width?: number;
};

type DataTableProps<T extends Record<string, unknown>> = {
  columns: DataTableColumn<T>[];
  rows: T[];
};

export function DataTable<T extends Record<string, unknown>>({ columns, rows }: DataTableProps<T>) {
  const { colors } = useEnterpriseTheme();

  return (
    <Surface padded={false}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={[styles.row, styles.header, { borderBottomColor: colors.border }]}>
            {columns.map((column) => (
              <Text
                key={String(column.key)}
                style={[styles.headerText, { width: column.width ?? 150, color: colors.textMuted }]}
              >
                {column.label}
              </Text>
            ))}
          </View>
          {rows.map((row, index) => (
            <View key={index} style={[styles.row, { borderBottomColor: colors.border }]}>
              {columns.map((column) => (
                <Text key={String(column.key)} style={[styles.cell, { width: column.width ?? 150, color: colors.text }]}>
                  {String(row[column.key])}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  header: {
    backgroundColor: "#f8fafc",
  },
  headerText: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  cell: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 14,
    fontWeight: "600",
  },
});

