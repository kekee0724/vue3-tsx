import produce, { Draft } from 'immer';
import { get, isArray, isObjectLike, isString, mergeWith, set } from 'lodash';
import { AnyAction } from 'redux';
import { Effect, ImmerReducer, mergeState, Subscription } from 'umi';

import { addRecord, deleteRecord, editRecord, getRecord } from './service';

export interface User {
  id: number;
  name: string;
  email: string;
  updateTime: string;
  updateTime: string;
  isValid: number;
}
export interface UserModelState {
  result: {
    data: Array<User>;
    meta: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface UserModelType {
  namespace: 'users';
  state: UserModelState;
  // 同步
  reducers: {
    // input: Reducer;
    // 启用 immer 之后
    input: ImmerReducer<UserModelState>;
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
      // const {
      //   result: {
      //     meta: { page: pageIndex, pageSize: pageSize, total },
      //   },
      // } = yield select((state: any) => state.users);
      const result = yield call(getRecord, data);
      if (result) yield put({ type: 'input', data: { result } });
    },
    *editRecord({ data, callback }, { call, put }) {
      const res = yield call(editRecord, data);
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
        if (pathname === '/users') {
          // dispatch({
          //   type: 'getRecord',
          //   data: { page: 1, pageSize: 5 },
          // });
        }
      });
    },
  },
};

export default UserModel;
