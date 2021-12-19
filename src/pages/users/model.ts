import { Effect, Reducer, Subscription } from 'umi';

import { addRecord, deleteRecord, editRecord, getRecord } from './service';

export interface User {
  id: number;
  name: string;
  email: string;
  create_time: string;
}
export interface UserModelState {
  result: {
    data: Array<User>;
    meta: {
      page: number;
      per_page: number;
      total: number;
    };
  };
}

export interface UserModelType {
  namespace: 'users';
  state: UserModelState;
  // 异步
  effects: {
    getRecord: Effect;
    editRecord: Effect;
    deleteRecord: Effect;
    addRecord: Effect;
  };
  // 同步
  reducers: {
    getList: Reducer<UserModelState>;
    input: Reducer;
    // 启用 immer 之后
    // getList: ImmerReducer<UserModelState>;
  };
  // 订阅
  subscriptions: { setup: Subscription };
}

const UserModel: UserModelType = {
  namespace: 'users',

  state: {
    result: {},
  },

  effects: {
    *getRecord({ data }, { call, put }) {
      const result = yield call(getRecord, data);
      if (result) yield put({ type: 'input', data: { result } });
    },
    *editRecord({ data }, { call, put }) {
      const res = yield call(editRecord, data);
      // yield put({ type: 'input', data: { list } });
    },
    *deleteRecord({ data }, { call, put }) {
      const res = yield call(deleteRecord, data);
      // yield put({ type: 'input', data: { list } });
    },
    *addRecord({ data }, { call, put }) {
      const res = yield call(addRecord, data);
      // yield put({ type: 'input', data: { list } });
    },
  },
  reducers: {
    input(state, { data }) {
      return {
        ...state,
        ...data,
      };
    },
    getList(state, action) {
      // return data;
      return {
        ...state,
        ...action.data,
      };
    },
    // 启用 immer 之后
    // save(state, { data }) {
    //   state = { ...state, ...data };
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRecord',
            data: { page: 1, per_page: 5 },
          });
        }
      });
    },
  },
};

export default UserModel;
