  import React, { useEffect, useState, useContext } from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert, Linking } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  import { useNavigation } from '@react-navigation/native';
  import axios from 'axios'; 
  import API_KEY from '../config'; 
  import { LocationContext } from '../contexts/LocationContext'; 

  export default function Informacao() {
    const navigation = useNavigation();
    const { location } = useContext(LocationContext); // Corrigido para acessar corretamente o objeto location

    const [farmaciaProxima, setFarmaciaProxima] = useState(null);
    const [detalhesFarmacia, setDetalhesFarmacia] = useState(null);

    useEffect(() => {
      if (location && location.latitude && location.longitude) {
        buscarFarmaciaProxima(location.latitude, location.longitude);
      } else if (location === null) {
        console.log("Buscando localização...");
      } else {
        console.error("Localização não disponível no contexto.");
      }
    }, [location]);

    const buscarFarmaciaProxima = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&type=pharmacy&key=${API_KEY}`
        );
        if (response.data.results.length > 0) {
          const farmacia = response.data.results[0];
          setFarmaciaProxima(farmacia);
          buscarDetalhesFarmacia(farmacia.place_id);
        } else {
          Alert.alert('Nenhuma farmácia encontrada nas proximidades.');
        }
      } catch (error) {
        console.error("Erro ao buscar farmácias:", error);
      }
    };

    const buscarDetalhesFarmacia = async (placeId) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`
        );
        setDetalhesFarmacia(response.data.result);
      } catch (error) {
        console.error("Erro ao buscar detalhes da farmácia:", error);
      }
    };

    const handleOpenMap = () => {
      if (!farmaciaProxima) {
        Alert.alert('Nenhuma farmácia próxima encontrada');
        return;
      }

      const { lat, lng } = farmaciaProxima.geometry.location;

      Alert.alert(
        "Abrir Mapa",
        "Deseja abrir o mapa no Google Maps ou Waze?",
        [
          {
            text: "Google Maps",
            onPress: () => {
              const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
              Linking.openURL(url);
            }
          },
          {
            text: "Waze",
            onPress: () => {
              const url = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
              Linking.openURL(url);
            }
          },
          { text: "Cancelar", style: "cancel" }
        ]
      );
    };

    const handlePhoneCall = () => {
      if (!detalhesFarmacia || !detalhesFarmacia.formatted_phone_number) {
        Alert.alert('Número de telefone não disponível');
        return;
      }

      const phoneNumber = `tel:${detalhesFarmacia.formatted_phone_number}`;
      Linking.openURL(phoneNumber);
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
              <Text style={styles.subtext}>{farmaciaProxima.name}</Text>
              <Text style={styles.subtext}>{farmaciaProxima.vicinity}</Text> 
              {detalhesFarmacia && detalhesFarmacia.formatted_phone_number && (
                <Text style={styles.subtext}>Telefone: {detalhesFarmacia.formatted_phone_number}</Text>
              )}
            </>
          ) : (
            <Text style={styles.subtext}>Buscando farmácias próximas...</Text>
          )}
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
