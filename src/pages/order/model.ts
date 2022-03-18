import { AnyAction } from 'redux';
import { Effect, Entity, ImmerReducer, mergeState, Subscription } from 'umi';

import { addSchedule, getSchedules } from './service';

export interface OrderSchedule extends Entity {
  score: number;
  orderId: number;
  orderName: string;
  teacherName: string;
}
export interface OrderModelState {
  result: {
    data: Array<OrderSchedule>;
    meta: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface OrderModelType {
  namespace: 'orders';
  state: OrderModelState;
  // 同步
  reducers: {
    // 启用 immer 之后
    input: ImmerReducer<OrderModelState>;
  };
  // 异步
  effects: {
    getSchedules: Effect;
    addSchedule: Effect;
  };
  // 订阅
  subscriptions: { setup: Subscription };
}

const OrderModel: OrderModelType = {
  namespace: 'orders',

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
    *getSchedules({ data }, { call, put }) {
      const result = yield call(getSchedules, data);
      if (result) yield put({ type: 'input', data: { result } });
    },
    *addSchedule({ data, callback }, { call, put }) {
      const res = yield call(addSchedule, data);
      callback && callback(res);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/orders') {
          // dispatch({
          //   type: 'getSchedules',
          //   data: { page: 1, pageSize: 5 },
          // });
        }
      });
    },
  },
};

export default OrderModel;
