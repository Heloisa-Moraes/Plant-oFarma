import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from '../contexts/LocationContext'; 
import connectToDatabase from '../services/db';  // Conectar ao banco MongoDB

export default function Informacao() {
  const navigation = useNavigation();
  const { location } = useContext(LocationContext);

  const [farmaciaProxima, setFarmaciaProxima] = useState(null);

  useEffect(() => {
    if (location && location.latitude && location.longitude) {
      buscarFarmaciaPlantao(location.latitude, location.longitude);
    } else {
      console.error("Localização não disponível.");
    }
  }, [location]);

  const buscarFarmaciaPlantao = async (latitude, longitude) => {
    try {
      const db = await connectToDatabase(); // Conecta ao MongoDB
      const collection = db.collection('Farmacias');

      const dataAtual = new Date().toISOString().slice(0, 10); // Data atual no formato YYYY-MM-DD

      const farmaciasPlantao = await collection.find({ plantao: dataAtual }).toArray();

      if (farmaciasPlantao.length === 0) {
        Alert.alert('Nenhuma farmácia de plantão hoje.');
        return;
      }

      const farmaciaMaisProxima = calcularFarmaciaMaisProxima(farmaciasPlantao, latitude, longitude);
      setFarmaciaProxima(farmaciaMaisProxima);

    } catch (error) {
      console.error("Erro ao buscar farmácias de plantão:", error);
    }
  };

  const calcularFarmaciaMaisProxima = (farmacias, latitude, longitude) => {
    let farmaciaProxima = null;
    let menorDistancia = Infinity;

    farmacias.forEach(farmacia => {
      const distancia = calcularDistancia(latitude, longitude, farmacia.location.coordinates[1], farmacia.location.coordinates[0]);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        farmaciaProxima = farmacia;
      }
    });

    return farmaciaProxima;
  };

  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      0.5 - Math.cos(dLat)/2 + 
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  };

  const handleOpenMap = () => {
    if (!farmaciaProxima) {
      Alert.alert('Nenhuma farmácia próxima encontrada.');
      return;
    }

    const { coordinates } = farmaciaProxima.location;
    const lat = coordinates[1];
    const lon = coordinates[0];

    Alert.alert(
      "Abrir Mapa",
      "Deseja abrir o mapa no Google Maps ou Waze?",
      [
        {
          text: "Google Maps",
          onPress: () => {
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
            Linking.openURL(url);
          }
        },
        {
          text: "Waze",
          onPress: () => {
            const url = `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`;
            Linking.openURL(url);
          }
        },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Farmácia de plantão mais próxima:</Text>
      {farmaciaProxima ? (
        <>
          <Text style={styles.subtext}>{farmaciaProxima.nome}</Text>
          <Text style={styles.subtext}>{farmaciaProxima.endereco}</Text>
        </>
      ) : (
        <Text style={styles.subtext}>Buscando farmácias de plantão próximas...</Text>
      )}

      <TouchableOpacity style={styles.callButton} onPress={handleOpenMap}>
        <Text style={styles.callButtonText}>Abrir no Mapa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 10,
  },
  callButton: {
    backgroundColor: '#A80000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
