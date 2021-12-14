import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '@levi-a/views/Home.vue'
import { About, Home as HomeTsx, Setting as SettingTsx } from '@levi-a/views'
import Setting from '@levi-a/views/Setting.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('@levi-a/views/Home')
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('@levi-a/views/About')
  // },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('@levi-a/views/Home.vue')
  // },
  {
    path: '/setting',
    name: 'Setting',
    component: SettingTsx,
    children: [
      {
        path: 'settingVue',
        name: 'SettingVue',
        component: Setting
      },
      {
        path: 'homeTsx',
        name: 'homeTsx',
        component: HomeTsx
      },
      {
        path: 'aboutVue',
        name: 'aboutVue',
        component: () => import('@levi-a/views/About.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: About
      },
      {
        path: 'form',
        name: 'form',
        component: () => import('@levi-a/views/Form.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'homeTsx',
        name: 'HomeTsx',
        component: HomeTsx
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'aboutVue',
        name: 'AboutVue',
        component: () => import('@levi-a/views/About.vue')
      }
    ]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '@levi-a/views/About')
  }
]

const router = createRouter({
  history: createWebHistory('/start-vue/'),
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
