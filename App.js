import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Abertura from './components/abertura';
import Informacao from './components/informacao'; // Nome ajustado
import Localizacao from './components/localizacao';
import Menu from './components/menu';
import Farmacias from './components/farmacias';
import Urgencia from './components/urgencia';
import Telefones from './components/telefones'; 
import { LocationProvider } from './contexts/LocationContext'; // Importar LocationProvider
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

function AberturaScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Localizacao');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return <Abertura />;
}

function LocalizacaoScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Informacao'); // Voltou para 'Informacao'
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return <Localizacao />;
}

export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AberturaScreen">
          <Stack.Screen name="AberturaScreen" component={AberturaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Informacao" component={Informacao} options={{ headerShown: false }} />
          <Stack.Screen name="Localizacao" component={LocalizacaoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          <Stack.Screen name="Telefones" component={Telefones} options={{ headerShown: false }} />
          <Stack.Screen name="Urgencia" component={Urgencia} options={{ headerShown: false }} />
          <Stack.Screen name="Farmacias" component={Farmacias} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </LocationProvider>
  );
}
