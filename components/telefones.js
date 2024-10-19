import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const PostoSaudeCard = ({ nome, endereco, telefone }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${telefone}`);
  };

  const handleOpenMap = () => {
    Alert.alert(
      "Abrir Mapa",
      "Deseja abrir o mapa no Google Maps ou Waze?",
      [
        {
          text: "Google Maps",
          onPress: () => {
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
            Linking.openURL(url);
          }
        },
        {
          text: "Waze",
          onPress: () => {
            const url = `https://waze.com/ul?ll=${encodeURIComponent(endereco)}&navigate=yes`;
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

  const postos = [
    { nome: 'UBS DRA. IRACEMA PETRI (PSF)', endereco: 'Av. João Paulo II, 311, Cohab', telefone: '(14) 3604-4073' },
    { nome: 'POSTO DE SAÚDE DA COHAB', endereco: 'Rua Francisco Angelice, 21, Cohab', telefone: '(14) 3604-4066' },
    { nome: 'POSTO DE SAÚDE DA VILA CORREIA', endereco: 'Rua Domingos Guedin, 272, Vila Correia', telefone: '(14) 3604-4067' },
    { nome: 'POSTO DE SAÚDE DO SONHO NOSSO', endereco: 'Rua Leona Pompeu, 201, Sonho Nosso II', telefone: '(14) 3604-4072' },
    { nome: 'POSTO CENTRAL (CENTRO DE SAÚDE II)', endereco: 'Rua Antonio Franco Pompeu, 302, V. Operária', telefone: '(14) 3604-4070' },
    { nome: 'POSTO DE SAÚDE DA VILA HABITACIONAL', endereco: 'Rua Fiori Giglioti, 365, V. Habitacional', telefone: '(14) 3604-4065' },
    { nome: 'UBS DR. MARCÍLIO TOGINI JÚNIOR', endereco: 'Rua João Piva, 431, Jardim da Barra', telefone: '(14) 3604-4077' },
    { nome: 'POSTO DE SAÚDE CAMPOS SALLES', endereco: 'Rod. SP 255, km 169, Bairro Campos Salles', telefone: '(14) 3604-4069' },
  ];

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
        {postos.map((posto, index) => (
          <PostoSaudeCard
            key={index}
            nome={posto.nome}
            endereco={posto.endereco}
            telefone={posto.telefone}
          />
        ))}
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
});
