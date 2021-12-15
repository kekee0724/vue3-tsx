// export default {
//   namespace: 'users',
//   state: {},
//   reducers: {},
//   effects: {},
//   subscriptions: {},
// };
import { fetch } from "@levi-a/user-service";
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

export namespace usersModel {
  export const namespace = "users";
  export const state = {
    list: [],
    total: null,
  };
  export const reducers = {
    save(state: any, { payload: { data: list, total } }: any) {
      return { ...state, list, total };
    },
  };
  export const effects = {
    *fetch({ payload: { page } }: any, { call, put }: any) {
      const { data, headers } = yield call(fetch, { page });
      yield put({
        type: "save",
        payload: { data, total: headers["x-total-count"] },
      });
    },
  };
  export const subscriptions = {
    setup({ dispatch, history }: any) {
      return history.listen(
        ({ pathname, query }: { pathname: string; query: string }) => {
          if (pathname === "/") {
            dispatch({ type: "fetch", payload: { query: query || "" } });
          }
        }
      );
    },
  };
}

// app.model(usersModel)
