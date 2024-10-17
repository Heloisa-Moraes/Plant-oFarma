import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FarmaciaCard = ({ nome, endereco, telefone, latitude, longitude, abre, fecha, aberta }) => {
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
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            Linking.openURL(url);
          }
        },
        {
          text: "Waze",
          onPress: () => {
            const url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
            Linking.openURL(url);
          }
        },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  return (
    <View style={styles.card}>
      {/* Indicador de Farmácia Aberta/Fechada */}
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, { backgroundColor: aberta ? 'green' : 'red' }]} />
        <Text style={styles.statusText}>{aberta ? 'Aberta' : 'Fechada'}</Text>
      </View>

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

export default function Farmacias() {
  const navigation = useNavigation();

  const farmacias = [
    { nome: 'DROGARIA TOTAL (ANTIGA COOPERBARRA I)', endereco: 'R: VALENTIN REGINATO, 399', telefone: '3438 1440', latitude: -22.491835091856895, longitude: -48.55048180403732, abre: '08:00', fecha: '21:00' },
    { nome: 'DROGARIA SÃO MARCOS', endereco: 'Av. Dionísio Dutra e Silva, 557', telefone: '3641 4844', latitude: -22.471427976604677, longitude: -48.56789185064798, abre: '12:00', fecha: '13:00' },//mudar horário 
    { nome: 'DROGAL (MAJOR POMPEU)', endereco: 'R.: MAJOR POMPEU, 335', telefone: '3642 3242', latitude: -22.497242361960758, longitude: -48.55997777050121, abre: '07:00', fecha: '22:00' },
    { nome: 'DROGARIA CONFIANÇA', endereco: 'R: 9 DE JULHO, 527', telefone: '3641 1295', latitude: -22.489120489859793, longitude: -48.56470687044626, abre: '08:00', fecha: '19:00' },
    { nome: 'FARMACENTRO', endereco: 'R.: PRUDENTE DE MORAES, 325', telefone: '3641 3256', latitude: -22.496261681669647, longitude: -48.55437857495177, abre: '12:00', fecha: '13:00' },//mudar horário 
    { nome: 'DROGAL (RIO BRANCO)', endereco: 'R: RIO BRANCO, 301', telefone: '3642 1230', latitude: -22.494980501703125, longitude: -48.55666775561035, abre: '07:00', fecha: '22:00' },
    { nome: 'DROGARIA COMPRE CERTO', endereco: 'R: 9 DE JULHO, 250', telefone: '3641 4724', latitude: -22.491360237023745, longitude: -48.56348774611534, abre: '12:00', fecha: '13:00' },//mudar horário 
    { nome: 'NATURALIS MANIPULAÇÃO E DROGARIA', endereco: 'RUA SAVÉRIO SALVI, 296', telefone: '3641 1664', latitude: -22.492943517843635, longitude: -48.55330146115117, abre: '12:00', fecha: '13:00' },//mudar horário 
    { nome: 'DROGARIA SÃO VALENTIM', endereco: 'AV: DR. CAIO SIMÕES, 282', telefone: '3604 1234', latitude: -22.465699361644834, longitude: -48.563719100210754, abre: '07:00', fecha: '22:00' },
    { nome: 'FARMÁCIA FÓRMULA', endereco: 'R: SEBASTIÃO FRANCO ARRUDA, 660', telefone: '3641 7844', latitude: -22.492943517843635, longitude: -48.55330146115117, abre: '08:00', fecha: '20:00' },
    { nome: 'DROGARIA POUPAQUI', endereco: 'R.: MAJOR POMPEU, 392', telefone: '3642 5545', latitude: -22.496778302516304, longitude: -48.560477274447365, abre: '08:00', fecha: '19:00' },
    { nome: 'DROGARIA BEM POPULAR BRASIL', endereco: 'R.: WINIFRIDA, 237', telefone: '91004 0344', latitude: -22.496053114359785, longitude: -48.561919807695126, abre: '08:00', fecha: '19:00' },
    { nome: 'DROGASIL', endereco: 'R: 1º DE MARÇO, 497', telefone: '3641 1588', latitude: -22.495041323691105, longitude: -48.560157264629005, abre: '07:00', fecha: '22:00' },
    { nome: 'FARMÁCIA DOS AMIGOS', endereco: 'R: SAVÉRIO SALVI, 326', telefone: '3438 1957', latitude: -22.465699361644834, longitude: -48.563719100210754, abre: '08:00', fecha: '19:00' },
    { nome: 'HIPERPOPULAR(ANTIGA COOPERBARRA II)', endereco: 'R: SALVADOR DE TOLEDO, 1000', telefone: '3641 0151', latitude: -22.49539560511187, longitude: -48.56123876146177, abre: '08:00', fecha: '19:00' },
    { nome: 'DROGARIA TOTAL - UNIDADE FÓRMULA (COHAB)', endereco: 'AV.: ARTHUR BALSI, 120', telefone: '3641 0060', latitude: -22.4759467022026, longitude: -48.56771149029899, abre: '08:00', fecha: '20:00' },
    { nome: 'DROGASOL', endereco: 'AV: ARTHUR BALSI, 300', telefone: '3642 3405', latitude: -22.47493982862817, longitude: -48.56628607495249, abre: '08:00', fecha: '19:00' },
  ];

  // Função para determinar se a farmácia está aberta
  const isFarmaciaAberta = (abre, fecha) => {
    if (!abre || !fecha) return false;

    const agora = new Date();
    const horaAtual = agora.getHours() + agora.getMinutes() / 60; // Hora atual em decimal

    const [abreHora, abreMinuto] = abre.split(':').map(Number);
    const [fechaHora, fechaMinuto] = fecha.split(':').map(Number);

    const horaAbertura = abreHora + abreMinuto / 60;
    const horaFechamento = fechaHora + fechaMinuto / 60;

    return horaAtual >= horaAbertura && horaAtual <= horaFechamento;
  };

  // Separar farmácias abertas e fechadas
  const farmaciasAbertas = farmacias.filter(farmacia => isFarmaciaAberta(farmacia.abre, farmacia.fecha));
  const farmaciasFechadas = farmacias.filter(farmacia => !isFarmaciaAberta(farmacia.abre, farmacia.fecha));

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
        {/* Exibir farmácias abertas */}
        <Text style={styles.sectionTitle}>Farmácias Abertas</Text>
        {farmaciasAbertas.map((farmacia, index) => (
          <FarmaciaCard
            key={index}
            nome={farmacia.nome}
            endereco={farmacia.endereco}
            telefone={farmacia.telefone}
            latitude={farmacia.latitude}
            longitude={farmacia.longitude}
            abre={farmacia.abre}
            fecha={farmacia.fecha}
            aberta={true} // Farmácia está aberta
          />
        ))}

        {/* Exibir farmácias fechadas */}
        <Text style={styles.sectionTitle}>Farmácias Fechadas</Text>
        {farmaciasFechadas.map((farmacia, index) => (
          <FarmaciaCard
            key={index}
            nome={farmacia.nome}
            endereco={farmacia.endereco}
            telefone={farmacia.telefone}
            latitude={farmacia.latitude}
            longitude={farmacia.longitude}
            abre={farmacia.abre}
            fecha={farmacia.fecha}
            aberta={false} // Farmácia está fechada
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
    top: 20,
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A80000',
    marginVertical: 15,
    alignSelf: 'flex-start',
    marginLeft: 20,
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
