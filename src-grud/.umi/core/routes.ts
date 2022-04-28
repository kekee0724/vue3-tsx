// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/kekee/develop/workspace/VsCodeProject/可可项目/umi项目/umi3-grud/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.tsx').default
  },
  {
    "path": "/users",
    "exact": true,
    "component": require('@/pages/users/index.tsx').default
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
