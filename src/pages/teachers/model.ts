import { AnyAction } from 'redux';
import { Effect, Entity, ImmerReducer, mergeState, Subscription } from 'umi';

import {
  addCourse,
  delCourse,
  editAchieve,
  editCourse,
  getTeacherSchedule,
} from './service';

export interface Achieve extends Entity {
  course: string;
  score: number;
  student: string;
  updateTime: string;
}
export interface TeacherSchedule extends Entity {
  achieve: Array<Achieve>;
  isValid: boolean;
  period: number;
  teacherId: number;
  teacherName: string;
  updateTime: string;
}
export interface TeacherModelState {
  result: {
    data: Array<TeacherSchedule>;
    meta: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface TeacherModelType {
  namespace: 'teachers';
  state: TeacherModelState;
  // 同步
  reducers: {
    // 启用 immer 之后
    input: ImmerReducer<TeacherModelState>;
  };
  // 异步
  effects: {
    getTeacherSchedule: Effect;
    editCourse: Effect;
    editAchieve: Effect;
    delCourse: Effect;
    addCourse: Effect;
  };
  // 订阅
  subscriptions: { setup: Subscription };
}

const TeacherModel: TeacherModelType = {
  namespace: 'teachers',

  state: {
    result: {
      data: [],
      meta: {
        total: 0,
        pageSize: 5,
        page: 1,
      },
    },
  },

  reducers: {
    input(state: any, action: AnyAction) {
      return mergeState(state, action);
    },
  },

  effects: {
    *getTeacherSchedule({ data }, { call, put }) {
      const result = yield call(getTeacherSchedule, data);
      if (result) yield put({ type: 'input', data: { result } });
    },
    *editCourse({ data, callback }, { call, put }) {
      const res = yield call(editCourse, data);
      callback && callback(res);
    },
    *editAchieve({ data, callback }, { call, put }) {
      const res = yield call(editAchieve, data);
      callback && callback(res);
    },
    *delCourse({ data, callback }, { call, put }) {
      const res = yield call(delCourse, data);
      callback && callback(res);
    },
    *addCourse({ data, callback }, { call, put }) {
      const res = yield call(addCourse, data);
      callback && callback(res);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/teachers') {
          // dispatch({
          //   type: 'getTeacherSchedule',
          //   data: { page: 1, pageSize: 5 },
          // });
        }
      });
    },
  },
};

export default TeacherModel;