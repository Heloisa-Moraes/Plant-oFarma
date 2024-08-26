import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Informacao() {
  return (
    <View style={styles.container}>
      <View style={styles.topCircle}></View>

      <View style={styles.alertContainer}>
        <View style={styles.iconContainer}>
          {/* O ícone de alerta será adicionado aqui */}
        </View>
        <Text style={styles.text}>ATENÇÃO!</Text>
        <Text style={styles.text}>Farmácia de Plantão 25/04/2024:</Text>
        <Text style={styles.text}>Farmácia São Joaquim</Text>
        <Text style={styles.subtext}>Endereço: Rua Maria Marta, 23 - Jardim Nova Barra</Text>
        <Text style={styles.subtext}>Telefone: (14) 3604-0000</Text>
      </View>

      <View style={styles.callButton}>
        <Text style={styles.callButtonText}>CLIQUE PARA LIGAR</Text>
      </View>

      <View style={styles.mapButton}>
        <Text style={styles.mapButtonText}>CLIQUE PARA ABRIR NO MAPA</Text>
      </View>

      <View style={styles.bottomCircle}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E1E0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topCircle: {
    width: '100%',
    height: 150,
    backgroundColor: '#A80000',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    position: 'absolute',
    top: 0,
  },
  bottomCircle: {
    width: '100%',
    height: 150,
    backgroundColor: '#A80000',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    position: 'absolute',
    bottom: 0,
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
    marginTop: 180, // Para ajustar o espaço entre o círculo superior e o conteúdo
  },
  iconContainer: {
    backgroundColor: '#0029FF', // Cor do ícone de alerta
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

