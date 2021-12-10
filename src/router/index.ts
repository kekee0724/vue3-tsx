import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('../views/Home')
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About')
  // },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('@/views/Home.vue')
  // },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/start-vue3/'),
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
