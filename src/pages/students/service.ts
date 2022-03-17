import request from '@/utils/request';
import { getLocalStorage } from '@/utils/storage';

export const getRecord = async () => {
  return request('/api/student/listStudentAchieves', {
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

export const listAllCourses = async () => {
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

export const addRecord = async (courseId: number) => {
  return request(`api/student/addCourse`, {
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
