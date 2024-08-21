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
    backgroundColor: '#D9DBD9',
    padding: 20,
  },
  alertContainer: {
    backgroundColor: '#A80000',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#0029FF', // cor do ícone de alerta
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    top: -40,
    zIndex: 1,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  callButton: {
    backgroundColor: '#A80000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapButton: {
    backgroundColor: '#FD2A2A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
