import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface UserModelState {
  data: Array<any>;
}

export interface UserModelType {
  namespace: 'users';
  state: UserModelState;
  // 异步
  effects: {
    query: Effect;
  };
  // 同步
  reducers: {
    getList: Reducer<UserModelState>;
    // 启用 immer 之后
    // getList: ImmerReducer<UserModelState>;
  };
  // 订阅
  subscriptions: { setup: Subscription };
}

const UserModel: UserModelType = {
  namespace: 'users',

  state: {
    data: [],
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    getList(state, action) {
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];
      // return data;
      return {
        ...state,
        data,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getList',
          });
        }
      });
    },
  },
};

export default UserModel;
