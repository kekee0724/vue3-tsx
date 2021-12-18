// export default {
//   namespace: 'users',
//   state: {},
//   reducers: {},
//   effects: {},
//   subscriptions: {},
// };
import { usersService } from "@levi-a/user-service";
// import { app } from "src";

// export namespace usersModel {
//   export const namespace = Namespaces.accountBindMobile;

//   export const state = freeze({
//     ...CoreState,
//     social: [],
//     phoneNumber: "",
//     smsCode: ""
//   }, !0);

//   export type StateType = typeof state;

//   export const reducers: ReducersMapObject<any, AnyAction> = {
//       ...CoreReducers,
//   };

//   export const effects: EffectsMapObject = {
//       ...CoreEffects
//   };
// }

// export default {
//   namespace: 'users',
//   state: {},
//   reducers: {},
//   effects: {},
//   subscriptions: {},
// };
import { CoreEffects, CoreReducers, CoreState } from "@levi-m/core";

export namespace usersModel {
  export const namespace = "users";
  export const state = {
    ...CoreState,
    list: [],
    total: null,
  };
  export const reducers = {
    ...CoreReducers,
    init() {
      return state;
    },
    save(state: any, { payload: { data: list, total, page } }: any) {
      return { ...state, list, total, page };
    },
  };
  export const effects = {
    ...CoreEffects,
    *fetch({ payload: { page = 1 } }: any, { call, put }: any) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({
        type: "save",
        payload: {
          data,
          total: parseInt(headers["x-total-count"], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }: any, { call, put }: any) {
      yield call(usersService.remove, id);
      yield put({ type: "reload" });
    },
    *patch({ payload: { id, values } }: any, { call, put }: any) {
      yield call(usersService.patch, id, values);
      yield put({ type: "reload" });
    },
    *create({ payload: values }: any, { call, put }: any) {
      yield call(usersService.create, values);
      yield put({ type: "reload" });
    },
    *reload(action: any, { put, select }: any): any {
      const page = yield select(
        (state: { users: { page: any } }) => state.users.page
      );
      yield put({ type: "fetch", payload: { page } });
    },
  };
  export const subscriptions = {
    setup({ dispatch, history }: any) {
      return history.listen(
        ({ pathname, query }: { pathname: string; query: string }) => {
          console.log(pathname, query);
          // if (pathname === "/") {
          //   dispatch({ type: "fetch", payload: { query: query || "" } });
          // }
        }
      );
    },
  };
}

// app.model(usersModel)
