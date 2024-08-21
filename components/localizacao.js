import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Localizacao() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Permitir que "PlantãoFarma" use a sua localização?</Text>
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
    height: 150,
    backgroundColor: '#a80000',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    position: 'absolute',
    top: 0,
  },
  bottomCircle: {
    width: '100%',
    height: 150,
    backgroundColor: '#a80000',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    position: 'absolute',
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});




