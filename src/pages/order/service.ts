import { Clerks } from 'umi';

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
  return request(`api/user/getAllClerks`, {
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

export const addOrders = async (data: Clerks) => {
  return request(`api/user/addOrders`, {
    method: 'post',
    data: {
      customerId: token?.id,
      storeId: data.storeId,
      clerkId: data.id,
      orderTime: data.orderTime,
      remark: data.remark,
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
