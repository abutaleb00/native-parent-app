import apiHandler from './apiHandler';

const dropOff = async (data: any) => {
  return await apiHandler.post('app/transport', data);
};

const get = async (data: any) => {
  return await apiHandler.get(`app/transport?classId=${data}`);
};

const getAuthorized = async (data: any) => {
  return await apiHandler.get(`attendance/pickup/${data}`);
};

const postAuthorized = async (data: any) => {
  return await apiHandler.post(
    `attendance/pickup/${data.personId}`,
    data.postObj,
  );
};

const deleteAuthorized = async (data: any) => {
  return await apiHandler.delete(
    `attendance/pickup/${data.id}?idNumber=${data.idNumber}`,
  );
};

const transportAPI = {
  dropOff,
  get,
  getAuthorized,
  postAuthorized,
  deleteAuthorized,
};

export default transportAPI;
