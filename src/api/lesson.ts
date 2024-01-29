import {format} from 'date-fns';
import apiHandler from './apiHandler';
import * as Type from './type/authType';

const getLessonScheduleList = async (): Promise<Type.Auth> => {
  return await apiHandler.get(
    `/app/lesson/schedule?date=${format(new Date(), 'yyyy-MM-dd')}`,
  ); //2024-01-11
};

const lessonAPI = {
  getLessonScheduleList,
};

export default lessonAPI;
