import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from '../contexts/LocationContext'; // Importar o LocationContext

export default function Localizacao() {
  const navigation = useNavigation();
  const { setLocation } = useContext(LocationContext); // Acessa a função setLocation do contexto

  useEffect(() => {
    const getLocationPermission = async () => {
      // Solicita permissão para acessar a localização
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização negada. Não será possível obter a farmácia mais próxima.');
        return;
      }

      // Obtém a localização atual do dispositivo
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      // Navega para a tela de Informacao após obter a localização
      navigation.replace('Informacao');
    };

    // Chama a função para obter a permissão e a localização
    getLocationPermission();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Círculo superior */}
      <View style={styles.topCircle} />

      {/* Conteúdo central */}
      <View style={styles.content}>
        <Text style={styles.text}>Permitir que "PlantãoFarma" use a sua localização?</Text>
        {/* Indicador de carregamento enquanto a localização é obtida */}
        <ActivityIndicator size="large" color="#a80000" style={{ marginTop: 20 }} />
      </View>

      {/* Círculo inferior */}
      <View style={styles.bottomCircle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E1E0',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topCircle: {
    width: '100%',
    height: 200,
    backgroundColor: '#a80000',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    position: 'absolute',
    top: 0,
  },
  bottomCircle: {
    width: '100%',
    height: 200,
    backgroundColor: '#a80000',
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    position: 'absolute',
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
