import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface UserModelState {
  list: Array<any>;
}

export interface UserModelType {
  namespace: 'users';
  state: UserModelState;
  // 异步
  effects: {
    getRemote: Effect;
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
    list: [],
  },

  effects: {
    *getRemote({ payload }, { call, put }) {
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
      yield put({ type: 'input', data: { list: data } });
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
            type: 'getRemote',
          });
        }
      });
    },
  },
};

export default UserModel;
