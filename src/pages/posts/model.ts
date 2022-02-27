import { AnyAction } from 'redux';
import { Effect, history, ImmerReducer, mergeState, Subscription } from 'umi';

import { addPosts, getPosts, getPostsDetail, getUsers } from './service';

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}
export interface Posts {
  id?: string;
  title: string;
  content: string;
  creator?: string;
  created_at?: string;
  updated_at?: string;
}
export interface PostModelState {
  user: User;
  posts: Posts[];
}

export interface PostModelType {
  namespace: 'posts';
  state: PostModelState;
  // 同步
  reducers: {
    // input: Reducer;
    // 启用 immer 之后
    input: ImmerReducer<PostModelState>;
  };
  // 异步
  effects: {
    getUsers: Effect;
    getPosts: Effect;
    getPostsDetail: Effect;
    addPosts: Effect;
  };
  // 订阅
  subscriptions: { setup: Subscription };
}

const PostModel: PostModelType = {
  namespace: 'posts',

  state: {
    user: {
      id: '',
      email: '',
      name: '',
      created_at: '',
      updated_at: '',
    },
    posts: [
      {
        title: '',
        creator: '',
        content: '',
        id: '',
        created_at: '',
        updated_at: '',
      },
    ],
  },

  reducers: {
    input(state: any, action: AnyAction) {
      return mergeState(state, action);
    },
  },

  effects: {
    *getUsers({ data }, { call, put, select }) {
      let user = yield select((state: PostModelState) => state.posts);
      if (!user?.id) {
        user = yield call(getUsers, data);
        if (user) yield put({ type: 'input', data: { user } });
      }
    },
    *getPosts({ data }, { call, put }) {
      const posts = yield call(getPosts, data);
      if (posts) yield put({ type: 'input', data: { posts } });
    },
    *getPostsDetail({ id }, { call, put }) {
      const postsDetail = yield call(getPostsDetail, id);
      if (postsDetail) yield put({ type: 'input', data: { postsDetail } });
    },
    *addPosts({ data, callback }, { call, put }) {
      const res = yield call(addPosts, data);
      if (res) {
        history.push('/posts');
      }
      callback && callback(res);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/posts') {
          dispatch({
            type: 'getUsers',
          });
          // dispatch({
          //   type: 'getPosts',
          //   data: { page: 1, count: 20 },
          // });
        }
      });
    },
  },
};

export default PostModel;
