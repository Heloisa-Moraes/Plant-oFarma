import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Informacao() {
  const navigation = useNavigation();

  const handlePhoneCall = async () => {
    Alert.alert(
      "Permissão para Ligação",
      "Deseja permitir que o aplicativo faça uma ligação?",
      [
        {
          text: "Permitir",
          onPress: () => {
            const phoneNumber = "tel:+551436040000";
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
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Permissão para acessar a localização foi negada.');
      return;
    }

    const latitude = -22.46997;
    const longitude = -48.55892;

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

  const handleMenuPress = () => {
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCircle}>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Ionicons name="menu" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.alertContainer}>
        <Text style={styles.text}>ATENÇÃO!</Text>
        <Text style={styles.text}>Farmácia de Plantão 25/04/2024:</Text>
        <Text style={styles.text}>Farmácia São Joaquim</Text>
        <Text style={styles.subtext}>Endereço: Rua Maria Marta, 23 - Jardim Nova Barra</Text>
        <Text style={styles.subtext}>Telefone: (14) 3604-0000</Text>
      </View>

      <TouchableOpacity style={styles.callButton} onPress={handlePhoneCall}>
        <Text style={styles.callButtonText}>CLIQUE PARA LIGAR</Text>
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        <View style={styles.bottomCircle}>
          <ImageBackground
            source={require('../img/mapa.png')}
            style={styles.mapButton}
            imageStyle={styles.mapImage}
          >
            <TouchableOpacity onPress={handleOpenMap} style={styles.callButton}>
              <Text style={styles.callButtonText}>CLIQUE PARA ABRIR NO MAPA</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 20,
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
    marginTop: 180,
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
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
  },
  bottomCircle: {
    width: '100%',
    height: 200,
    backgroundColor: '#A80000',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    overflow: 'hidden',
  },
  mapButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    opacity: 0.9,
  },
});
