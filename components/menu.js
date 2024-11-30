import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Menu() {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.navigate(screen); // Navega para a tela correspondente
  };

  const handleBackPress = () => {
    navigation.goBack(); // Voltar para a tela de informação
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCircle}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => handleNavigate('Telefones')}
        >
          <Ionicons name="call" size={35} color="white" />
          <Text style={styles.menuText}>TELEFONES ÚTEIS</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => handleNavigate('Urgencia')}
        >
          <Ionicons name="medkit" size={35} color="white" />
          <Text style={styles.menuText}>URGÊNCIA</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => handleNavigate('Farmacias')}
        >
          <Ionicons name="home" size={35} color="white" />
          <Text style={styles.menuText}>+FARMÁCIAS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.plusButtonContainer}>
        <Ionicons name="add-circle-outline" size={94} color="#A80000" />
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
  },
  backButton: {
    position: 'absolute',
    top: 40, // Ajuste feito aqui para alinhar com o menu
    left: 20,
  },
  menuContainer: {
    marginTop: 180,
    width: '80%',
  },
  menuItem: {
    backgroundColor: '#A80000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 30, //alterado o tamanho da letra 
    fontWeight: 'bold',
    marginLeft: 10,
  },
  plusButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
