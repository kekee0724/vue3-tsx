import request from '@/utils/request';
import { getLocalStorage } from '@/utils/storage';

const token =
  getLocalStorage('authsessiontoken') &&
  JSON.parse(getLocalStorage('authsessiontoken'));
export const getOrders = async () => {
  return request('/api/user/getUserInfo', {
    method: 'post',
    data: {
      userId: token?.id,
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

export const getAllClerks = async () => {
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

export const addOrders = async (courseId: number) => {
  return request(`api/student/addOrders`, {
    method: 'post',
    data: {
      studentId: token?.id,
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
