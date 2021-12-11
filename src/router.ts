import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '@/apps/views/Home.vue'
import { About } from '@/apps/views'
import Setting from '@/apps/views/Setting.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('@/apps/views/Home')
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('@/apps/views/About')
  // },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('@/apps/views/Home.vue')
  // },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '@/apps/views/About')
  }
]

const router = createRouter({
  history: createWebHistory('/start-vue/'),
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
