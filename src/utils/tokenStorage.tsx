import AsyncStorage from '@react-native-async-storage/async-storage';
import {Token} from '../api/type/authType';
const tokenName = 'accessToken';
const expiresName = 'refreshToken';
// const refreshExpiresName = "ec_refresh_expires";

const TokenStorage = {
  get: async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken').then(function (
        value: any,
      ) {
        return JSON.parse(value);
      });
      const refreshToken = await AsyncStorage.getItem('refreshToken').then(
        function (value: any) {
          return JSON.parse(value);
        },
      );
      return {token, refreshToken};
    } catch (e) {
      console.log(e)
    }
  },
  set: async (token: string, refreshToken: string) => {
    try {
      await AsyncStorage.setItem('accessToken', JSON.stringify(token));
      await AsyncStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    } catch (e) {}
  },
  delete: async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      //   await UserStorage.delete();
    } catch (e) {}
  },
};

export default TokenStorage;
