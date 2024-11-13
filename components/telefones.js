import * as React from 'react';
import { View, Text, TouchableOpacity, Alert, Linking, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

const PostoSaudeCard = ({ nome, endereco, telefone, location }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${telefone}`);
  };

  const handleOpenMap = () => {
    // Verificando se a farmácia tem coordenadas
    if (!location || !location.coordinates) {
      console.log('Nenhuma coordenada de farmácia encontrada.');
      Alert.alert('Coordenadas inválidas ou não encontradas!');
      return;
    }

    const [longitude, latitude] = location.coordinates;

    // Verificando se as coordenadas estão corretas
    if (!latitude || !longitude) {
      console.log('Coordenadas inválidas!');
      Alert.alert('Coordenadas inválidas!');
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
            console.log('Google Maps URL:', url);  // Verificando a URL do Google Maps
            Linking.openURL(url);
          }
        },
        {
          text: "Waze",
          onPress: () => {
            const url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
            console.log('Waze URL:', url);  // Verificando a URL do Waze
            Linking.openURL(url);
          }
        },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  return (
    <View style={styles.card}>
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

export default function Informacao() {
  const navigation = useNavigation();

  // Estado para armazenar as farmácias da API
  const [farmacias, setFarmacias] = useState([]);
  const [loading, setLoading] = useState(true);  // Estado de carregamento

  useEffect(() => {
    const fetchFarmacias = async () => {
      try {
        // Fazendo a requisição para a API
        const response = await fetch('http://10.0.0.125:3000/farmacias'); // Ajuste o IP conforme necessário
        const data = await response.json();

        setFarmacias(data);  // Armazenando as farmácias no estado
      } catch (error) {
        console.error('Erro ao carregar farmácias:', error);
      } finally {
        setLoading(false);  // Desativa o estado de carregamento
      }
    };

    fetchFarmacias();
  }, []);  // A requisição será feita apenas uma vez quando a tela for carregada

  const handleBackPress = () => {
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCircle}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? (
          <Text style={styles.loadingText}>Carregando farmácias...</Text>  // Exibe mensagem enquanto carrega
        ) : (
          farmacias.map((farmacia, index) => (
            <PostoSaudeCard
              key={index}
              nome={farmacia.nome}
              endereco={farmacia.endereco}
              telefone={farmacia.telefone}
              location={farmacia.location} // Passando a localização para o componente
            />
          ))
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
    top: 40, // Ajuste para alinhar o botão
    left: 20,
  },
  scrollViewContent: {
    paddingTop: 150, // Deixa espaço para o topo fixo
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A80000',
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
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
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});
