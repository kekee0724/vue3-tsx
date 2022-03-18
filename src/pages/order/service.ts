import request from '@/utils/request';
import { getLocalStorage } from '@/utils/storage';

export const getSchedules = async () => {
  return request('/api/student/getSchedules', {
    method: 'post',
    data: {
      studentId: JSON.parse(getLocalStorage('authsessiontoken')).id,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const getAllCourses = async () => {
  return request(`api/student/listAllCourses`, {
    method: 'post',
    data: {},
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const addSchedule = async (courseId: number) => {
  return request(`api/student/addSchedule`, {
    method: 'post',
    data: {
      studentId: JSON.parse(getLocalStorage('authsessiontoken')).id,
      courseId,
    },
  })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
