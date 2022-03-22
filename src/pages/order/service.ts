import { Clerks } from 'umi';

import request from '@/utils/request';
import { getLocalStorage } from '@/utils/storage';
import moment from 'moment';

export const getOrders = async () => {
  const userId =
    getLocalStorage('authsessiontoken') &&
    JSON.parse(getLocalStorage('authsessiontoken'))?.id;
  return request('/api/user/getUserInfo', {
    method: 'post',
    data: {
      userId,
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
  const customerId =
    getLocalStorage('authsessiontoken') &&
    JSON.parse(getLocalStorage('authsessiontoken'))?.customerId;
  return request(`api/user/addOrders`, {
    method: 'post',
    data: {
      customerId,
      storeId: data.storeId,
      clerkId: data.id,
      orderTime: data.orderTime?.toISOString(),
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

export const editOrdered = async (data: Clerks) => {
  return request(`api/user/editOrdered`, {
    method: 'post',
    // data
    data: { ...data, orderTime: moment(data?.orderTime)!.toISOString() },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
