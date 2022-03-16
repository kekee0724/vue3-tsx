import { Posts } from 'umi';

import request from '@/utils/request';

export const getUsers = async (params: { page: number; pageSize: number }) => {
  return request('/api/users/me', {
    method: 'get',
    params,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const getPosts = async (params: { page: number; count: number }) => {
  return request('/api/users/me/posts', {
    method: 'get',
    params,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const getPostsDetail = async (id: string) => {
  console.log(`/api/posts/${id}`);
  return request(`/api/posts/${id}`, {
    method: 'get',
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const addPosts = async (data: Posts) => {
  return request(`/api/posts`, {
    method: 'post',
    data,
  })
    .then(function (response) {
      // return true;
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
