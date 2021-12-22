import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
// import { login, logout } from '@/api/login';
import { Locale, UserState } from '@/interface/user/user';
import { getGlobalState } from '@/utils/getGloabal';
// import { Role } from '@/interface/user/login';
// import { getInfo, permmenu } from '@/api/account';
import { filterAsyncRoute } from '@/routes/generator-router';
import type { MenuChild } from '@/interface/layout/menu.interface';
import { flatArrayObject } from '@/utils';
import { defaultMenuRoutes } from '@/routes';

const initialState: UserState = {
  ...getGlobalState(),
  noticeCount: 0,
  userInfo: {},
  locale: (localStorage.getItem('locale')! || 'zh_CN') as Locale,
  firstLogin: JSON.parse(localStorage.getItem('firstLogin')!) ?? true,
  logged: localStorage.getItem('t') ? true : false,
  menuList: [],
  routeList: [],
  // like [ 'sys:user:add', 'sys:user:update' ]
  perms: [],
  username: localStorage.getItem('username') || '',
  avatar: '',
  role: (localStorage.getItem('username') || '') as Role
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      const { username } = action.payload;

      if (username !== state.username) {
        localStorage.setItem('username', action.payload.username || '');
      }

      Object.assign(state, action.payload);
    },
    setRoutes(state, action: PayloadAction<Partial<UserState>>) {
      // const { menuList } = action.payload
      Object.assign(state, action.payload);
    },
    setUserInfo(state, action: PayloadAction<Partial<API.AdminUserInfo>>) {
      // const { menuList } = action.payload
      Object.assign(state.userInfo, action.payload);
    }
  }
});

export const { setUserItem, setRoutes, setUserInfo } = userSlice.actions;

export default userSlice.reducer;

export const loginAsync = (payload: API.LoginParams) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await login(payload);
      localStorage.setItem('t', data.token);
      dispatch(
        setUserItem({
          logged: true,
          username: payload.username
        })
      );
      return true;
    } catch (error) {
      return false;
    }
  };
};

export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    const { code } = await logout({ token: localStorage.getItem('t')! });
    if (code === 200) {
      localStorage.clear();
      dispatch(
        setUserItem({
          logged: false
        })
      );
      return true;
    }
    return false;
  };
};
// 初始化用户及权限信息
export const getUserInfo = () => {
  return async (dispatch: Dispatch): Promise<{ menus: API.Menu[]; perms: string[]; user: API.AdminUserInfo }> => {
    try {
      const results = await Promise.all([permmenu(), getInfo()]);
      const pm = results[0];
      const info = results[1];
      const { perms, menus } = pm;
      dispatch(setUserInfo(info));

      return { menus, perms, user: info };
    } catch (error) {
      return error as any;
    }
  };
};

export const generateRoutes = (menus: API.Menu[]) => {
  return async (dispatch: Dispatch) => {
    // 后端路由json进行转换成真正的router map
    const routeList = filterAsyncRoute(menus, null);
    // 404 route must be end
    // routeList.push(NotFoundRouter)
    const defaultRoutes = flatArrayObject<MenuChild>(defaultMenuRoutes, ['children']);
    const asyncRoutes = flatArrayObject<MenuChild>(routeList, ['children']);
    dispatch(
      setRoutes({
        routeList: [...defaultRoutes, ...asyncRoutes],
        menuList: [...defaultMenuRoutes, ...routeList]
      })
    );
    return routeList;
  };
};
