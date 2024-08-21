import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function Abertura() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f36ee3472f947dc047956cde75ebdda48307ac0f4281978cb9f2fd6da10231e3?placeholderIfAbsent=true&apiKey=c57338241fda4c7288fb98e453506981' }}
            style={styles.icon}
          />
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/02161ee3f06d0f00e0dfd84430fddb335743f0ab1a6ee3ef1a03f3db9c9e52e2?placeholderIfAbsent=true&apiKey=c57338241fda4c7288fb98e453506981' }}
            style={styles.icon}
          />
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/69e844fb43e84e4f46fc6286c45d40caebf569bfc999365a73ee93cce47d5976?placeholderIfAbsent=true&apiKey=c57338241fda4c7288fb98e453506981' }}
            style={styles.icon}
          />
        </View>
      </View>
      <Image
        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e5212507a027c23c8e39471d16bb1c9bf0f5b3c40ec403ff448d09e37dd64022?placeholderIfAbsent=true&apiKey=c57338241fda4c7288fb98e453506981' }}
        style={styles.mainImage}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Saúde sempre à mão!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a80000',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 330,
    marginBottom: 20,
  },
  time: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  mainImage: {
    width: 225,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
