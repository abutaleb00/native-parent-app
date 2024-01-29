import axios, {InternalAxiosRequestConfig} from 'axios';
import TokenStorage from '../utils/tokenStorage';
import {getJWTDecode, logout, sleep} from '../utils/general';
import {navigate} from '../utils/rootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiHandler = axios.create({
  baseURL: 'https://edubricks.ocu-napse.com/api/',
  timeout: 10 * 1000, // 10 seconds
  withCredentials: true,
});

const requestHandler = async (config: InternalAxiosRequestConfig<any>) => {
  const schoolId = await AsyncStorage.getItem('schoolId').then(function (
    value: any,
  ) {
    return JSON.parse(value);
  });

  config.headers.schoolId = schoolId;
  config.headers.app = 'parent';

  // console.log(config);
  if (config.url === '/auth/login') {
    return config;
  }
  const {token, refreshToken}: any = await TokenStorage.get();
  if (token) {
    const refresh = getJWTDecode(token);
    const expiry = refresh.exp;

    if (!expiry) {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    }

    if (Number(expiry) > Date.now() / 1000) {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    }

    try {
      const {data} = await axios.post(
        'https://edubricks.ocu-napse.com/api//auth/refresh',
        {
          token: refreshToken,
        },
      );
      if (data.accessToken) {
        TokenStorage.set(data.accessToken, refreshToken);
        config.headers.authorization = `Bearer ${data.accessToken}`;
      }
    } catch (error) {
      console.log(error);
      logout();
      navigate('Login', null, true);
      // navigation.replace('Login');
    }
  } else {
    logout();
    navigate('Login', null, true);
    // login
  }

  return config;
};

const responseHandler = (response: any) => {
  return response?.data;
};

// const responseErrorHandler = async (error: {response: {data: any}}) => {
//   return error.response.data;
// };
const responseErrorHandler = async (error: {
  response: {data: {message: any}};
  request: any;
}) => {
  if (error.response) {
    console.log(error.response.data);
    return Promise.reject(error.response.data.message);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log(error);
  }
  return Promise.reject(error);
};

apiHandler.interceptors.request.use(requestHandler);
apiHandler.interceptors.response.use(responseHandler, responseErrorHandler);

export default apiHandler;

