import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Urgencia() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack(); // Voltar para a tela de menu
  };

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
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
        <View style={styles.card}>
          <Text style={styles.info}>Ambulância: (14) 3641-7088</Text>
          <TouchableOpacity style={styles.callButton} onPress={() => handleCall('(14) 3641-7088')}>
            <Text style={styles.callButtonText}>Ligar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.info}>Pronto Socorro: 192</Text>
          <TouchableOpacity style={styles.callButton} onPress={() => handleCall('192')}>
            <Text style={styles.callButtonText}>Ligar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.info}>Hospital e Maternidade São José: (14) 3604-7144</Text>
          <TouchableOpacity style={styles.callButton} onPress={() => handleCall('(14) 3604-7144')}>
            <Text style={styles.callButtonText}>Ligar</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'flex-start',
    paddingLeft: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  content: {
    marginTop: 100,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A80000',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: 'center',
  },
  info: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  callButton: {
    backgroundColor: '#A80000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
