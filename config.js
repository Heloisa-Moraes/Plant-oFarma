import { Platform } from 'react-native';

// config.js
const KEYS = {
    IP_SERVER_BASE: '10.0.0.125',
    IP_SERVER_ANDROID: '10.0.0.125',
    IP_SERVER_IOS: '10.0.0.125',
}

const getServerIp = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return KEYS.IP_SERVER_ANDROID;  // Use o IP da sua máquina aqui
    } else {
      return KEYS.IP_SERVER_BASE;
    }
  };


export default getServerIp;
