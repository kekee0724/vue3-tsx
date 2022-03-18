// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Users/kekee/develop/WebProject/umi项目/umi-demo/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelModel0 from '/Users/kekee/develop/WebProject/umi项目/umi-demo/src/pages/login/model.ts';
import ModelModel1 from '/Users/kekee/develop/WebProject/umi项目/umi-demo/src/pages/order/model.ts';
import ModelModel2 from '/Users/kekee/develop/WebProject/umi项目/umi-demo/src/pages/posts/model.ts';
import ModelModel3 from '/Users/kekee/develop/WebProject/umi项目/umi-demo/src/pages/students/model.ts';
import ModelModel4 from '/Users/kekee/develop/WebProject/umi项目/umi-demo/src/pages/teachers/model.ts';
import dvaImmer, { enableES5, enableAllPlugins } from '/Users/kekee/develop/WebProject/umi项目/umi-demo/node_modules/dva-immer/dist/index.js';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  app.use(dvaImmer());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'model', ...ModelModel0 });
app.model({ namespace: 'model', ...ModelModel1 });
app.model({ namespace: 'model', ...ModelModel2 });
app.model({ namespace: 'model', ...ModelModel3 });
app.model({ namespace: 'model', ...ModelModel4 });
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
