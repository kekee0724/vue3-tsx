import produce, { Draft } from 'immer';
import { get, isArray, isObjectLike, isString, mergeWith, set } from 'lodash';
import { AnyAction } from 'redux';
import { Effect, history, ImmerReducer, Subscription } from 'umi';

import { setLocalStorage } from '@/utils/storage';

import { loginUser, register } from './service';

export interface User {
  id: number;
  name: string;
  email: string;
  updateTime: string;
  updateTime: string;
  isValid: number;
}
export interface LoginModelState {}

export interface LoginModelType {
  namespace: 'login';
  state: LoginModelState;
  // 同步
  reducers: {
    // input: Reducer;
    // 启用 immer 之后
    input: ImmerReducer<LoginModelState>;
  };
  // 异步
  effects: {
    register: Effect;
    login: Effect;
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

const LoginModel: LoginModelType = {
  namespace: 'login',

  state: {},

  reducers: {
    input(state: any, action: AnyAction) {
      return mergeState(state, action);
    },
  },

  effects: {
    *register({ data, callback }, { call, put }) {
      try {
        const res = yield call(register, data);
        console.log(res);
        if (res) {
          setLocalStorage('authsessiontoken', res?.token);
          history.push('/posts');
        }
        callback && callback(res);
      } catch (error) {
        console.log(error);
      }
    },
    *login({ data, callback }, { put, call, select }) {
      try {
        const res = yield call(loginUser, data);
        console.log(res);
        if (res) {
          setLocalStorage('authsessiontoken', res?.token);
          history.push('/posts');
        }
        callback && callback(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/login') {
          // dispatch({
          //   type: 'getRecord',
          //   data: { page: 1, pageSize: 5 },
          // });
        }
      });
    },
  },
};

export default LoginModel;
