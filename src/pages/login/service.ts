import { message } from 'antd';
import { extend } from 'umi-request';

const errorHandler = function (error: any) {
  if (error.response) {
    if (error.response.status >= 400) {
      message.error(error?.data?.error);
    }
  } else {
    message.error('网络连接不稳定');
  }
  throw error;
};

const extendRequest = extend({ errorHandler });

export const loginUser = async (data: any) => {
  return extendRequest(`api/auth/login`, {
    method: 'post',
    data,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const register = async (data: any) => {
  return extendRequest(`api/auth/register`, {
    method: 'post',
    data,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
