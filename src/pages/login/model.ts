import produce, { Draft } from 'immer';
import { get, isArray, isObjectLike, isString, mergeWith, set } from 'lodash';
import { AnyAction } from 'redux';
import { Effect, ImmerReducer, Subscription } from 'umi';

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
  namespace: 'login';
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

export function mergeState(state: any, { key, data }: any) {
  return produce(state, (draft: Draft<any>) => {
    if (isArray(key) || isString(key)) {
      const value = get(draft, key);

      isObjectLike(value)
        ? mergeWith(value, data, customizer)
        : set(draft, key, data);
    } else {
      return mergeWith(draft, data, customizer);
    }
  });
}

function customizer(objValue: any, srcValue: any) {
  if (isArray(objValue)) {
    return srcValue;
  }
}

const UserModel: UserModelType = {
  namespace: 'login',

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
      //     meta: { page: pageIndex, per_page: pageSize, total },
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
          //   data: { page: 1, per_page: 5 },
          // });
        }
      });
    },
  },
};

export default UserModel;
