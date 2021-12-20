import { Effect, Reducer, Subscription } from 'umi';

import { addRecord, deleteRecord, editRecord, getRecord } from './service';

export interface User {
  id: number;
  name: string;
  email: string;
  create_time: string;
  update_time: string;
  status: number;
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
  // 同步
  reducers: {
    getList: Reducer<UserModelState>;
    input: Reducer;
    // 启用 immer 之后
    // getList: ImmerReducer<UserModelState>;
  };
  // 异步
  effects: {
    getRecord: Effect;
    editRecord: Effect;
    deleteRecord: Effect;
    addRecord: Effect;
  };
  // 订阅
  subscriptions: { setup: Subscription };
}

const UserModel: UserModelType = {
  namespace: 'users',

  state: {
    result: {
      data: [],
      meta: {
        total: 0,
        per_page: 5,
        page: 1,
      },
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

  effects: {
    *getRecord({ data }, { call, put }) {
      // const {
      //   result: {
      //     meta: { page: pageIndex, per_page: pageSize, total },
      //   },
      // } = yield select((state: any) => state.users);
      // console.log(pageIndex, pageSize, total);
      const result = yield call(getRecord, data);
      if (result) yield put({ type: 'input', data: { result } });
    },
    *editRecord({ data, callback }, { call, put }) {
      const res = yield call(editRecord, data);
      callback && callback(res);
      // yield put({ type: 'input', data: { list } });
    },
    *deleteRecord({ data, callback }, { call, put }) {
      const res = yield call(deleteRecord, data);
      callback && callback(res);
      // yield put({ type: 'input', data: { list } });
    },
    *addRecord({ data, callback }, { call, put }) {
      const res = yield call(addRecord, data);
      callback && callback(res);
      // yield put({ type: 'input', data: { list } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/users') {
          // dispatch({
          //   type: 'getRecord',
          //   data: { page: 1, per_page: 5 },
          // });
        }
      });
    },
  },
};

export default UserModel;
