import {formatParams} from '../utils/general';
import apiHandler from './apiHandler';
import * as Type from './type/authType';
// import {LessonData, LessonScheduleData} from './type/lessonType';

const getAllMedication = async (studentId?: number | null): Promise<any> => {
  return await apiHandler.get(
    '/app/health/medication' + formatParams({studentId}),
  );
};
const getAllAllergy = async (studentId?: number | null): Promise<any> => {
  return await apiHandler.get(
    '/app/health/allergy' + formatParams({studentId}),
  );
};
const postMedication = async (data: any) => {
  console.log(data);
  return apiHandler.post('/app/health/medication', data);
};
const deleteMedication = async (data: any) => {
  console.log(data);
  return apiHandler.delete('/app/health/medication', data);
};
const postAllergy = async (data: any): Promise<any> => {
  return await apiHandler.post('/app/health/allergy', data);
};
const deleteAllergy = async (data: any): Promise<any> => {
  return await apiHandler.delete('/app/health/allergy', data);
};

const medicationAPI = {
  getAllMedication,
  getAllAllergy,
  postMedication,
  postAllergy,
  deleteAllergy,
  deleteMedication,
};

export default medicationAPI;
