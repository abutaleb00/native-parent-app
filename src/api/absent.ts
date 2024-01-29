import {formatParams} from '../utils/general';
import apiHandler from './apiHandler';

const getAbsent = async (): Promise<any> => {
  return await apiHandler.get('/app/absent');
};
const postAbsent = async (data: any): Promise<any> => {
  console.log(data);
  return await apiHandler.post('/app/absent', data);
};
const deleteAbsent = async (data: any): Promise<any> => {
  console.log(data);
  return await apiHandler.delete('/app/absent', data);
};
const absentAPI = {
  getAbsent,
  postAbsent,
  deleteAbsent,
};

export default absentAPI;
