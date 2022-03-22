import { AnyAction } from 'redux';
import { Effect, Entity, ImmerReducer, mergeState, Subscription } from 'umi';

import { addOrders, editOrdered, getOrders } from './service';

export interface Orders extends Entity {
  clerkName: string;
  clerkPhone?: string;
  customerName: string;
  customerPhone?: string;
  storeName?: string;
  storePhone?: string;
  orderTime: moment.Moment;
  remark: string;
  isValid: boolean;
}

export interface Clerks extends Entity {
  address: string;
  clerkPhone: string;
  id: number;
  name: string;
  storeId: number;
  storeName: string;
  storePhone: string;
  orderTime?: moment.Moment & string;
  remark?: string;
}

export interface OrderModelState {
  result: {
    data: {
      orders: Array<Orders>;
    };
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
    getOrders: Effect;
    addOrders: Effect;
    editOrdered: Effect;
  };
  // 订阅
  subscriptions: { setup: Subscription };
}

const OrderModel: OrderModelType = {
  namespace: 'orders',

  state: {
    result: {
      data: { orders: [] },
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
    *getOrders({ data }, { call, put }) {
      try {
        const result = yield call(getOrders, data);
        if (result) yield put({ type: 'input', data: { result } });
      } catch (error) {
        console.log(error);
      }
    },
    *addOrders({ data, callback }, { call, put }) {
      const res = yield call(addOrders, data);
      callback && callback(res);
    },
    *editOrdered({ data, callback }, { call, put }) {
      const res = yield call(editOrdered, data);
      callback && callback(res);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/orders') {
          // dispatch({
          //   type: 'getOrders',
          //   data: { page: 1, pageSize: 5 },
          // });
        }
      });
    },
  },
};

export default OrderModel;
