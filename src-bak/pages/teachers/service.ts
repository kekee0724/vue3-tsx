import { Achieve, TeacherSchedule } from 'umi';

import request from '@/utils/request';
import { getLocalStorage } from '@/utils/storage';

export const getSchedules = async () => {
  return request('/api/teacher/getSchedules', {
    method: 'post',
    data: {
      teacherId: JSON.parse(getLocalStorage('authsessiontoken')).id,
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

export const editCourse = async (course: TeacherSchedule) => {
  return request(`api/teacher/editCourse`, {
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

export const editAchieve = async (achieve: Achieve) => {
  return request(`api/teacher/editAchieve`, {
    method: 'post',
    data: { achieve },
  })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const addCourse = async (course: TeacherSchedule) => {
  return request(`api/teacher/addCourse`, {
    method: 'post',
    data: {
      teacherId: JSON.parse(getLocalStorage('authsessiontoken')).id,
      course,
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

export const delCourse = async ({ id: courseId }: { id: number }) => {
  return request(`api/teacher/delCourse`, {
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
