/*
 * @Author: 可可同学
 * @Date: 2021-12-10 00:32:42
 * @LastEditTime: 2021-12-10 01:01:06
 * @LastEditors: 可可同学
 * @Description:
 */
import { state } from './state'
import { createStore } from 'vuex'

export default createStore({
  state,
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  },
  modules: {
  }
})
