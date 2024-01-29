import apiHandler from './apiHandler';
import * as Type from './type/authType';
import {formatParams} from '../utils/general';
import {MediaType} from './type/generalType';

const getProfile = async (): Promise<any> => {
  return await apiHandler.get('/app/profile');
};

const postAppreciation = async (data: any) => {
  return await apiHandler.post('app/appreciation', data);
};

const getAttendance = async (
  date?: string | Date,
  personId?: number | null,
): Promise<any> => {
  return await apiHandler.get(
    '/app/attendance' + formatParams({date, personId}),
  );
};
const getTimeline = async (
  date?: string | Date,
  classId?: number | null,
  studentId?: number | null,
): Promise<any> => {
  return await apiHandler.get(
    '/app/timeline' + formatParams({date, classId, studentId}),
  );
};

const getNews = async (): Promise<Type.Auth> => {
  return await apiHandler.get(`app/news`);
};

const getGallery = async (): Promise<any> => {
  return await apiHandler.get('app/gallery');
};

const submitMedia = async (data: MediaType): Promise<any> => {
  return await apiHandler.post('/app/media', data);
};

const postImage = async (data: any) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', '1b5aec89-c5bf-463f-ac46-b17702b700c1');

  var formdata = new FormData();
  formdata.append('media', data.base64);

  var requestOptions: any = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };
  try {
    const res: any = await fetch('https://media.ocu-napse.com', requestOptions);
    return res;
  } catch {
    (error: any) => console.log('error', error);
  }
};

const generalAPI = {
  getProfile,
  postAppreciation,
  getAttendance,
  getTimeline,
  getNews,
  getGallery,
  submitMedia,
  postImage,
};

export default generalAPI;
