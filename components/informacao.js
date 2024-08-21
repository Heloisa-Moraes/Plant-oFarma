import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Informacao() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Farmácia de Plantão 25/04/2024: Farmácia São Joaquim</Text>
      <Text style={styles.subtext}>Endereço: Rua Maria Marta, 23 - Jardim Nova Barra</Text>
      <Text style={styles.subtext}>Telefone: (14) 3604-0000</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtext: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
});
