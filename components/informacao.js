import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from '../contexts/LocationContext'; // Importa o contexto de localização

export default function Informacao() {
  const navigation = useNavigation();
  const { location } = useContext(LocationContext); // Obtém a localização do contexto
  const ipServer = '10.0.2.2'; // IP do servidor

  const [farmaciaProxima, setFarmaciaProxima] = useState(null);
  const [distancia, setDistancia] = useState(null);

  // Função para calcular a distância entre dois pontos de latitude e longitude
  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLon / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;
    return distancia.toFixed(2); // Distância com 2 casas decimais
  };

  // Função para buscar a farmácia de plantão
  useEffect(() => {
    const buscarFarmaciaDePlantao = async () => {
      if (location) {
        try {
          const response = await fetch(`http://${ipServer}:3000/farmacias`);
          const farmacias = await response.json();

          // Filtrar farmácias pelo plantão de hoje
          const dataAtual = new Date().toISOString().slice(0, 10);
          const farmaciaPlantao = farmacias.find(farmacia => farmacia.dataPlantao === dataAtual);

          if (farmaciaPlantao) {
            setFarmaciaProxima(farmaciaPlantao);

            // Calcular a distância
            const distanciaCalculada = calcularDistancia(
              location.latitude,
              location.longitude,
              farmaciaPlantao.latitude,
              farmaciaPlantao.longitude
            );
            setDistancia(distanciaCalculada);
          } else {
            console.error('Nenhuma farmácia de plantão foi encontrada para hoje.');
          }
        } catch (error) {
          console.error('Erro ao buscar farmácias:', error);
        }
      } else {
        console.error('Localização do usuário não disponível.');
      }
    };

    buscarFarmaciaDePlantao();
  }, [location]);

  const handleOpenMap = () => {
    if (!farmaciaProxima) {
      Alert.alert('Nenhuma farmácia de plantão próxima encontrada.');
      return;
    }

    const { latitude, longitude } = farmaciaProxima;

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
        <Text style={styles.text}>Farmácia de plantão mais próxima:</Text>
        {farmaciaProxima ? (
          <>
            <Text style={styles.subtext}>{farmaciaProxima.nome}</Text>
            <Text style={styles.subtext}>{farmaciaProxima.endereco}</Text>
            <Text style={styles.subtext}>Distância: {distancia} km</Text>
            <TouchableOpacity style={styles.callButton} onPress={handleOpenMap}>
              <Text style={styles.callButtonText}>CLIQUE PARA ABRIR NO MAPA</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.subtext}>Buscando farmácias de plantão próximas...</Text>
        )}
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
});
