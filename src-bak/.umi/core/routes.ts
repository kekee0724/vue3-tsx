// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/kekee/develop/WebProject/umi项目/umi-demo/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@ant-design/pro-layout/es/PageLoading';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "exact": true,
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index' */'@/pages/index.tsx'), loading: LoadingComponent})
  },
  {
    "path": "/login",
    "exact": true,
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__login__index' */'@/pages/login/index.tsx'), loading: LoadingComponent})
  },
  {
    "path": "/order",
    "exact": true,
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__order__index' */'@/pages/order/index.tsx'), loading: LoadingComponent})
  },
  {
    "path": "/posts/add",
    "exact": true,
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__posts__add' */'@/pages/posts/add.tsx'), loading: LoadingComponent})
  },
  {
    "path": "/posts/detail/:id",
    "exact": true,
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__posts__detail__id' */'@/pages/posts/detail/[id].tsx'), loading: LoadingComponent})
  },
  {
    "path": "/posts",
    "exact": true,
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__posts__index' */'@/pages/posts/index.tsx'), loading: LoadingComponent})
  },
  {
    "path": "/students",
    "exact": true,
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__students__index' */'@/pages/students/index.tsx'), loading: LoadingComponent})
  },
  {
    "path": "/teachers",
    "exact": true,
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__teachers__index' */'@/pages/teachers/index.tsx'), loading: LoadingComponent})
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
