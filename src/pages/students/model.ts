import { AnyAction } from 'redux';
import {
  Effect,
  ImmerReducer,
  mergeState,
  Subscription,
  TeacherSchedule,
  Entity,
} from 'umi';

import { addRecord, getRecord, listAllCourses } from './service';

export interface StudentSchedule extends Entity {
  score: number;
  studentId: number;
  studentName: string;
  teacherName: string;
}
export interface StudentModelState {
  record: Array<TeacherSchedule>;
  result: {
    data: Array<StudentSchedule>;
    meta: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface StudentModelType {
  namespace: 'students';
  state: StudentModelState;
  // 同步
  reducers: {
    // input: Reducer;
    // 启用 immer 之后
    input: ImmerReducer<StudentModelState>;
  };
  // 异步
  effects: {
    getRecord: Effect;
    listAllCourses: Effect;
    addRecord: Effect;
  };
  // 订阅
  subscriptions: { setup: Subscription };
}

const StudentModel: StudentModelType = {
  namespace: 'students',

  state: {
    record: [],
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
    *getRecord({ data }, { call, put }) {
      const result = yield call(getRecord, data);
      if (result) yield put({ type: 'input', data: { result } });
    },
    *listAllCourses({}, { call, put }) {
      const record = yield call(listAllCourses);
      if (record) yield put({ type: 'input', data: { record } });
    },
    *addRecord({ data, callback }, { call, put }) {
      const res = yield call(addRecord, data);
      callback && callback(res);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/students') {
          // dispatch({
          //   type: 'getRecord',
          //   data: { page: 1, pageSize: 5 },
          // });
        }
      });
    },
  },
};

export default StudentModel;
