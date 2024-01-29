import {jwtDecode} from 'jwt-decode';
import 'core-js/stable/atob';
import TokenStorage from './tokenStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getJWTDecode = (token: string) => {
  var decoded = jwtDecode(token);
  return decoded;
};

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const formatCurrency = (currency: string) => {
  const curr = parseFloat(currency).toFixed(2);
  const num =
    'RM ' + curr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  return num;
};

export const logout = () => {
  TokenStorage.delete();
  AsyncStorage.removeItem('profile');
  AsyncStorage.removeItem('schoolId');
};

export const formatParams = (obj: Object) => {
  if (Object.entries(obj).length === 0) return '';

  return (
    '?' +
    Object.entries(obj)
      .filter(([, value]) => value !== null)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  );
};
