import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Menu</Text>
      <Button title="Ir para Localização" onPress={() => navigation.navigate('Localizacao')} />
      <Button title="Ir para Informação" onPress={() => navigation.navigate('Informacao')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
