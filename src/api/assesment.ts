import {format} from 'date-fns';
import apiHandler from './apiHandler';

const getAssesment = async (data: any) => {
  return await apiHandler.get(`app/assesment?studentId=${data.id}`);
};

const assesmentApi = {getAssesment};

export default assesmentApi;
