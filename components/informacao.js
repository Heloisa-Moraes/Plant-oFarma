import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';

export default function Informacao() {
  const handlePhoneCall = async () => {
    // Permissão para fazer a ligação
    Alert.alert(
      "Permissão para Ligação",
      "Deseja permitir que o aplicativo faça uma ligação?",
      [
        {
          text: "Permitir",
          onPress: () => {
            const phoneNumber = "tel:+551436040000"; // Número da Farmácia
            Linking.openURL(phoneNumber);
          }
        },
        {
          text: "Negar",
          style: "cancel"
        }
      ]
    );
  };

  const handleOpenMap = async () => {
    // Pedir permissão de localização
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Permissão para acessar a localização foi negada.');
      return;
    }

    // Coordenadas ou endereço
    const latitude = -22.46997; // Exemplo de coordenadas
    const longitude = -48.55892; // Exemplo de coordenadas

    // Perguntar se quer abrir no Google Maps ou Waze
    Alert.alert(
      "Abrir Mapa",
      "Deseja abrir o mapa no Google Maps ou Waze?",
      [
        {
          text: "Google Maps",
          onPress: () => {
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            Linking.openURL(url);
          }
        },
        {
          text: "Waze",
          onPress: () => {
            const url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
            Linking.openURL(url);
          }
        },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCircle}></View>

      <View style={styles.alertContainer}>
        <View style={styles.iconContainer}>
          {/* Ícone de alerta pode ser adicionado aqui */}
        </View>
        <Text style={styles.text}>ATENÇÃO!</Text>
        <Text style={styles.text}>Farmácia de Plantão 25/04/2024:</Text>
        <Text style={styles.text}>Farmácia São Joaquim</Text>
        <Text style={styles.subtext}>Endereço: Rua Maria Marta, 23 - Jardim Nova Barra</Text>
        <Text style={styles.subtext}>Telefone: (14) 3604-0000</Text>
      </View>

      {/* Botão para ligação */}
      <TouchableOpacity style={styles.callButton} onPress={handlePhoneCall}>
        <Text style={styles.callButtonText}>CLIQUE PARA LIGAR</Text>
      </TouchableOpacity>

      {/* Botão para abrir no mapa com imagem de fundo */}
      <View style={styles.mapContainer}>
        <ImageBackground
          source={require('../img/mapa.png')} // Caminho para a imagem dentro da pasta img
          style={styles.mapButton}
          imageStyle={styles.mapImage}
        >
          <TouchableOpacity onPress={handleOpenMap} style={styles.mapButtonOverlay}>
            <Text style={styles.mapButtonText}>CLIQUE PARA ABRIR NO MAPA</Text>
          </TouchableOpacity>
        </ImageBackground>
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
    marginTop: 180, // Ajusta o espaço entre o círculo superior e o conteúdo
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
  mapContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  mapButton: {
    width: '80%',
    height: 70, // Altura do botão com fundo de mapa
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  mapButtonOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mapImage: {
    borderRadius: 10,
    opacity: 0.9,
  },
});
