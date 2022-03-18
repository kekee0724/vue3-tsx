import { User } from 'umi';

import request from '@/utils/request';

export const loginUser = async (user: User) => {
  return request(`api/${user.role}/login`, {
    method: 'post',
    data: { [user.role]: user },
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
  return request(`api/${user.role}/register`, {
    method: 'post',
    data: { [user.role]: user },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
