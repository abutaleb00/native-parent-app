import apiHandler from './apiHandler';
import * as Type from './type/authType';

const login = async (data: Type.LoginData): Promise<Type.Login> => {
  return await apiHandler.post('/auth/login', data);
};
const refreshToken = async (
  data: Type.RefreshTokenData,
): Promise<Type.RefreshToken> => {
  return await apiHandler.post('/auth/refresh', data);
};
const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}): Promise<Type.ChangePassword> => {
  return await apiHandler.post('auth/changePassword', data);
};

const getProfile = async (data: any): Promise<any> => {
  return await apiHandler.get('/app/profile', data);
};

const getOTP = async (data: any): Promise<Type.Auth> => {
  return await apiHandler.post(`auth/forgetPassword`, data);
};

const verifyOTP = async (data: any): Promise<Type.Auth> => {
  return await apiHandler.post(`/auth/verifyOTP`, data);
};

const setNewPassword = async (data: any): Promise<Type.Auth> => {
  return await apiHandler.post(`/auth/setPassword`, data);
};

const authAPI = {
  login,
  changePassword,
  getProfile,
  refreshToken,
  getOTP,
  verifyOTP,
  setNewPassword,
};

export default authAPI;
