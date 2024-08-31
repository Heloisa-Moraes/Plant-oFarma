import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Urgencia() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack(); // Voltar para a tela de menu
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCircle}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>URGÊNCIA</Text>
        <Text style={styles.info}>Ambulância: (14) 3641-7088</Text>
        <Text style={styles.info}>Pronto Socorro: Ligue 192</Text>
        <Text style={styles.info}>Hospital São José: (14) 3604-7144</Text>
      </View>
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
    justifyContent: 'center',
    alignItems: 'flex-start', // Alinha o conteúdo à esquerda
    paddingLeft: 20, // Adiciona padding à esquerda
    position: 'relative', // Faz com que os filhos usem posição relativa
  },
  backButton: {
    position: 'absolute',
    top: 20, // Ajusta a posição vertical do botão
    left: 20, // Ajusta a posição horizontal do botão
  },
  content: {
    marginTop: 80, // Ajusta a margem superior para evitar sobreposição com o círculo
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A80000',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
});
