import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Localizacao() {
  return (
    <View style={styles.container}>
      {/* Círculo superior */}
      <View style={styles.topCircle} />
      
      {/* Conteúdo central */}
      <View style={styles.content}>
        <Text style={styles.text}>Permitir que "PlantãoFarma" use a sua localização?</Text>
      </View>

      {/* Círculo inferior */}
      <View style={styles.bottomCircle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E1E0',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topCircle: {
    width: '100%',
    height: 200,
    backgroundColor: '#a80000',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    position: 'absolute',
    top: 0,
  },
  bottomCircle: {
    width: '100%',
    height: 200,
    backgroundColor: '#a80000',
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    position: 'absolute',
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,  // Garante que o conteúdo fique sobre os círculos
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
