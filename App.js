import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Abertura from './components/abertura';
import Informacao from './components/informacao';
import Localizacao from './components/localizacao';
import Menu from './components/menu';
import Farmacias from './components/farmacias';
import Urgencia from './components/urgencia';
import Telefones from './components/telefones'; 
import { LocationProvider } from './contexts/LocationContext'; // Importar LocationProvider

const Stack = createStackNavigator();

function AberturaScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Localizacao');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return <Abertura />;
}

function LocalizacaoScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Informacao');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return <Localizacao />;
}

function HomeScreen({ navigation }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [showLocateButton, setShowLocateButton] = useState(true);
  const [showPlantaoFarma, setShowPlantaoFarma] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setShowLocateButton(false);
        },
        error => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
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
          <Button title="Ver Farmácia de Plantão" onPress={() => setShowPlantaoFarma(true)} color="#a80000" />
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
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AberturaScreen">
          <Stack.Screen name="AberturaScreen" component={AberturaScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="Localizacao" component={LocalizacaoScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="Informacao" component={Informacao}  options={{ headerShown: false }}/>
          <Stack.Screen name="Menu" component={Menu}  options={{ headerShown: false }}/>
          <Stack.Screen name="Telefones" component={Telefones} options={{ headerShown: false }}/>
          <Stack.Screen name="Urgencia" component={Urgencia} options={{ headerShown: false }}/>  
          <Stack.Screen name="Farmacias" component={Farmacias} options={{ headerShown: false }}/> 
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}

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
});
