import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: { height: 60, backgroundColor: '#d4af37', justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#002147' },
});
