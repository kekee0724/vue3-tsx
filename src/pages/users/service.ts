import { message } from 'antd';
import { User } from 'umi';
import { extend } from 'umi-request';

const errorHandler = function (error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status >= 400) {
      message.error(error?.data?.msg || error?.data?.message || error?.data);
    }
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    message.error('网络连接不稳定');
    console.log(error.message);
  }

  throw error; // If throw. The error will continue to be thrown.
};

// 1. Unified processing
const extendRequest = extend({ errorHandler });

export const getRecord = async (params: { page: number; pageSize: number }) => {
  return extendRequest('/api/teacher/listTeacherCourses', {
    method: 'post',
    // params,
    data: {
      teacherId: 1,
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

export const editRecord = async (course: User) => {
  return extendRequest(`api/teacher/editCourse`, {
    method: 'post',
    data: { course },
  })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const addRecord = async (course: User) => {
  return extendRequest(`api/teacher/addCourse`, {
    method: 'post',
    data: { teacherId: 1, course },
  })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const deleteRecord = async ({ id: courseId }: { id: number }) => {
  return extendRequest(`api/teacher/delCourse`, {
    method: 'post',
    data: { courseId },
  })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
