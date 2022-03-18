import { User } from 'umi';

import request from '@/utils/request';

export const loginUser = async (user: User) => {
  return request(`api/auth/login`, {
    method: 'post',
    data: { user },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const register = async (user: User) => {
  return request(`api/auth/register`, {
    method: 'post',
    data: { user },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
