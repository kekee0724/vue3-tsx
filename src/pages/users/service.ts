import { message } from 'antd';

import request, { extend } from 'umi-request';

const errorHandler = function (error) {
  // const codeMap = {
  //   '021': 'An error has occurred',
  //   '022': 'It’s a big mistake,',
  //   // ....
  // };
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.status);
    if (error.response.status >= 400) {
      message.error(error?.data?.message || error?.data);
    }
    // console.log(error.response.headers);
    // console.log(error.request);
    // console.log(codeMap[error.data.status]);
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    message.error('网络连接不稳定');
    console.log(error.message);
  }

  throw error; // If throw. The error will continue to be thrown.

  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};

// 1. Unified processing
const extendRequest = extend({ errorHandler });

export const getRecord = async (params) => {
  return extendRequest('api/users', {
    method: 'get',
    params,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editRecord = async ({ id, values }) => {
  return extendRequest(`api/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(function (response) {
      message.success('编辑成功');
    })
    .catch(function (error) {
      message.success('编辑失败');
      console.log(error);
    });
};

export const deleteRecord = async ({ id }) => {
  return extendRequest(`api/users/${id}`, {
    method: 'delete',
  })
    .then(function (response) {
      message.success('删除成功');
    })
    .catch(function (error) {
      message.success('删除失败');
      console.log(error);
    });
};

export const addRecord = async (data) => {
  return extendRequest(`api/users`, {
    method: 'post',
    data,
  })
    .then(function (response) {
      message.success('添加成功');
    })
    .catch(function (error) {
      message.success('添加失败');
      console.log(error);
    });
};
