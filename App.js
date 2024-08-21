import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Abertura from './components/abertura';
import Informacao from './components/informacao';
import Localizacao from './components/localizacao';
import Menu from './components/menu';

const Stack = createStackNavigator();

function AberturaScreen({ navigation }) {
  // Navega automaticamente para a tela de Informacao após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Localizacao'); // Usando replace para que o usuário não possa voltar para a tela de abertura
    }, 3000); // 3 segundos

    return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
  }, [navigation]);

  return <Abertura />;
}

/* function LocalizacaoScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Informacao'); // Navega para Informação após 3 segundos
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return <Localizacao />; 
  } */

function HomeScreen({ navigation }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [showLocateButton, setShowLocateButton] = useState(true);
  const [showPlantaoFarma, setShowPlantaoFarma] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          calculateDistances(position.coords.latitude, position.coords.longitude);
          setShowLocateButton(false);
        },
        error => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const calculateDistances = (lat, lon) => {
    const updatedPharmacies = getPharmacies().map(pharmacy => {
      const distance = calculateDistance(lat, lon, pharmacy.latitude, pharmacy.longitude);
      return { ...pharmacy, distance };
    });
    setPharmacies(updatedPharmacies);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // raio da Terra em km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // distância em km
    return distance;
  };

  const toRadians = (deg) => {
    return deg * (Math.PI / 180);
  };

  const openMaps = (pharmacy) => {
    if (pharmacy) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`;
      Linking.openURL(url);
    } else {
      alert('Por favor, selecione uma farmácia.');
    }
  };

  const goBack = () => {
    setShowLocateButton(true);
    setLatitude(null);
    setLongitude(null);
    setSelectedPharmacy(null);
    setPharmacies([]);
  };

  return (
    <View style={styles.container}>
      {showPlantaoFarma ? (
        <PlantaoFarma />
      ) : (
        <>
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>ATENÇÃO!</Text>
            <Text style={styles.alertSubText}>FARMÁCIA DE PLANTÃO 25/04/2024:</Text>
            <Text style={styles.pharmacyName}>FARMÁCIA SÃO JOAQUIM</Text>
            <Text style={styles.address}>RUA MARIA MARTA, 29 - JARDIM NOVA BARRA</Text>
            <Text style={styles.phone}>(14) 3604-4588</Text>
          </View>
          <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL('tel:1436044588')}>
            <Text style={styles.callButtonText}>CLIQUE PARA LIGAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton} onPress={() => openMaps(selectedPharmacy)}>
            <Text style={styles.mapButtonText}>CLIQUE PARA ABRIR NO MAPA</Text>
          </TouchableOpacity>
          {showLocateButton ? (
            <Button title="Localizar" onPress={getLocation} color="#a80000"/>
          ) : (
            <Button title="Voltar" onPress={goBack} color="#FF5733" />
          )}
          {latitude && longitude && (
            <ScrollView style={styles.pharmacyList}>
              {pharmacies.map(pharmacy => (
                <View key={pharmacy.name} style={styles.pharmacyItem}>
                  <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                  <TouchableOpacity onPress={() => openMaps(pharmacy)}>
                    <Text style={styles.openMapButton}>Abrir Mapa</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          <Button title="Ver Farmácia de Plantão" onPress={() => setShowPlantaoFarma(true)} color="#a80000" />
          {/* Adicione os botões para navegar para as outras telas */}
          <Button title="Ir para Localização" onPress={() => navigation.navigate('Localizacao')} color="#007bff" />
          <Button title="Ir para Informação" onPress={() => navigation.navigate('Informacao')} color="#007bff" />
          <Button title="Ir para Menu" onPress={() => navigation.navigate('Menu')} color="#007bff" />
        </>
      )}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AberturaScreen">
        <Stack.Screen name="AberturaScreen" component={AberturaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Localizacao" component={Localizacao} />
        <Stack.Screen name="Informacao" component={Informacao} />
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const getPharmacies = () => {
  return [
    { name: 'Farmácia São João', latitude: -22.510734188507968, longitude: -48.558026700475 },
    { name: 'Drogaria Pague Menos', latitude: -22.520734188507968, longitude: -48.548026700475 },
    // Adicione mais farmácias conforme necessário
  ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DBD9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  alertContainer: {
    backgroundColor: '#a80000',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  alertText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  alertSubText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  callButton: {
    backgroundColor: '#a80000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapButton: {
    backgroundColor: '#a80000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pharmacyList: {
    flex: 1,
    width: '100%',
  },
  pharmacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  openMapButton: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
