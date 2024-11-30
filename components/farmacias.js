import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import getServerIp from '../config';


const FarmaciaCard = ({ nome, endereco, telefone, latitude, longitude, aberta }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${telefone}`);
  };

  const handleOpenMap = () => {
    // Log para verificar as coordenadas passadas para o mapa
    console.log(`Abrindo mapa para: Latitude = ${latitude}, Longitude = ${longitude}`);

    // Verificando se as coordenadas são válidas
    if (!latitude || !longitude) {
      Alert.alert("Erro", "Coordenadas inválidas.");
      return;
    }

    Alert.alert(
      "Abrir Mapa",
      "Deseja abrir o mapa no Google Maps ou Waze?",
      [
        {
          text: "Google Maps",
          onPress: () => {
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            console.log(`Abrindo Google Maps com a URL: ${url}`);
            Linking.openURL(url).catch((err) => {
              console.error("Erro ao abrir o Google Maps:", err);
              Alert.alert("Erro", "Não foi possível abrir o Google Maps.");
            });
          }
        },
        {
          text: "Waze",
          onPress: () => {
            let url;
            if (Platform.OS === 'ios') {
              url = `waze://?ll=${latitude},${longitude}&navigate=yes`;
            } else {
              url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
            }

            // Log para verificar a URL gerada
            console.log(`Abrindo Waze com a URL: ${url}`);
            
            Linking.openURL(url).catch((err) => {
              console.error("Erro ao abrir o Waze:", err);
              Alert.alert("Erro", "Não foi possível abrir o Waze.");
            });
          }
        },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, { backgroundColor: aberta ? 'green' : 'red' }]} />
        <Text style={styles.statusText}>{aberta ? 'Aberta' : 'Fechada'}</Text>
      </View>

      <Text style={styles.title}>{nome}</Text>
      <Text style={styles.info}>{endereco}</Text>

      <TouchableOpacity style={styles.expandButton} onPress={handleToggleExpand}>
        <Text style={styles.buttonText}>{expanded ? 'Mostrar Menos' : 'Saber Mais'}</Text>
      </TouchableOpacity>

      {expanded && (
        <>
          <Text style={styles.info}>Telefone: {telefone}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <Text style={styles.actionButtonText}>Ligar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleOpenMap}>
              <Text style={styles.actionButtonText}>Abrir no Mapa</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default function Farmacias() {
  const navigation = useNavigation();
  const [farmaciasAbertas, setFarmaciasAbertas] = useState([]);
  const [farmaciasFechadas, setFarmaciasFechadas] = useState([]);
  const [loading, setLoading] = useState(true);

  // const getServerIp = () => {
  //   if (Platform.OS === 'ios' || Platform.OS === 'android') {
  //     return '172.20.10.5';  // Use o IP da sua máquina aqui
  //   } else {
  //     return 'localhost';
  //   }
  // };


  useEffect(() => {
    const ipServer = getServerIp();
    const buscarFarmacias = async () => {
      try {
        const response = await fetch(`http://${ipServer}:3000/farmacias`);
        if (!response.ok) {
          throw new Error('Erro ao buscar farmácias');
        }
        const farmacias = await response.json();
  
        // Verificando as coordenadas de cada farmácia
        farmacias.forEach((farmacia) => {
          console.log(`Farmácia: ${farmacia.nome}, Latitude: ${farmacia.location.coordinates[0]}, Longitude: ${farmacia.location.coordinates[1]}`);
        });
  
        const agora = new Date();
        const horaAtual = agora.getHours() + agora.getMinutes() / 60;
  
        const abertas = farmacias.filter(farmacia => {
          const [abreHora, abreMinuto] = farmacia.abre.split(':').map(Number);
          const [fechaHora, fechaMinuto] = farmacia.fecha.split(':').map(Number);
  
          let horaAbertura = abreHora + abreMinuto / 60;
          let horaFechamento = fechaHora + fechaMinuto / 60;
  
          // Lógica para lidar com horários que cruzam a meia-noite
          if (horaFechamento < horaAbertura) {
            // Se a farmácia fecha após a meia-noite
            return horaAtual >= horaAbertura || horaAtual <= horaFechamento;
          }
  
          return horaAtual >= horaAbertura && horaAtual <= horaFechamento;
        });
  
        const fechadas = farmacias.filter(farmacia => !abertas.includes(farmacia));
        setFarmaciasAbertas(abertas);
        setFarmaciasFechadas(fechadas);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar farmácias:', error);
        setLoading(false);
      }
    };
  
    buscarFarmacias();
  }, []);
  

  const handleNavigateToPlantao = () => {
    navigation.navigate('Informacao');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCircle}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.sectionTitle}>Farmácias Abertas</Text>
        {farmaciasAbertas.length > 0 ? (
          farmaciasAbertas.map((farmacia, index) => (
            <FarmaciaCard
              key={index}
              nome={farmacia.nome}
              endereco={farmacia.endereco}
              telefone={farmacia.telefone}
              latitude={farmacia.location.coordinates[1]}
              longitude={farmacia.location.coordinates[0]}
              aberta={true}
            />
          ))
        ) : (
          <View>
            <Text style={styles.noFarmaciaText}>Não há nenhuma farmácia aberta no momento.</Text>
            <TouchableOpacity style={styles.plantaoButton} onPress={handleNavigateToPlantao}>
              <Text style={styles.plantaoButtonText}>Verifique aqui a farmácia de plantão!</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>Farmácias Fechadas</Text>
        {farmaciasFechadas.length > 0 ? (
          farmaciasFechadas.map((farmacia, index) => (
            <FarmaciaCard
              key={index}
              nome={farmacia.nome}
              endereco={farmacia.endereco}
              telefone={farmacia.telefone}
              latitude={farmacia.location.coordinates[1]}
              longitude={farmacia.location.coordinates[0]}
              aberta={false}
            />
          ))
        ) : (
          <Text style={styles.noFarmaciaText}>Todas as farmácias estão abertas.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E1E0',
  },
  topCircle: {
    width: '100%',
    height: 150,
    backgroundColor: '#A80000',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    justifyContent: 'center',
    paddingRight: 20,
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  scrollViewContent: {
    paddingTop: 150,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A80000',
  },
  info: {
    fontSize: 20,
    color: '#333',
    marginVertical: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#A80000',
    marginVertical: 15,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  noFarmaciaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A80000',
    marginBottom: 10,
    textAlign: 'center',
  },
  plantaoButton: {
    backgroundColor: '#A80000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
  },
  plantaoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expandButton: {
    backgroundColor: '#A80000',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#A80000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
