import { AnyAction } from 'redux';
import {
  Effect,
  ImmerReducer,
  mergeState,
  Subscription,
  User,
  Entity,
} from 'umi';

import {
  addRecord,
  deleteRecord,
  editAchieve,
  editRecord,
  getRecord,
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
    // input: Reducer;
    // 启用 immer 之后
    input: ImmerReducer<TeacherModelState>;
  };
  // 异步
  effects: {
    getRecord: Effect;
    editRecord: Effect;
    editAchieve: Effect;
    deleteRecord: Effect;
    addRecord: Effect;
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
    // input(state, { data }) {
    //   return {
    //     ...state,
    //     ...data,
    //   };
    // },
    // 启用 immer 之后
    // input(state, { data }) {
    //   state.result = data.result;
    // },
    input(state: any, action: AnyAction) {
      return mergeState(state, action);
    },
  },

  effects: {
    *getRecord({ data }, { call, put }) {
      const result = yield call(getRecord, data);
      if (result) yield put({ type: 'input', data: { result } });
    },
    *editRecord({ data, callback }, { call, put }) {
      const res = yield call(editRecord, data);
      callback && callback(res);
    },
    *editAchieve({ data, callback }, { call, put }) {
      const res = yield call(editAchieve, data);
      callback && callback(res);
    },
    *deleteRecord({ data, callback }, { call, put }) {
      const res = yield call(deleteRecord, data);
      callback && callback(res);
    },
    *addRecord({ data, callback }, { call, put }) {
      const res = yield call(addRecord, data);
      callback && callback(res);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/teachers') {
          // dispatch({
          //   type: 'getRecord',
          //   data: { page: 1, pageSize: 5 },
          // });
        }
      });
    },
  },
};

export default TeacherModel;
