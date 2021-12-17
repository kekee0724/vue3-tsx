// import {
//     BrowserRouter as Router,
//     Redirect,
//     Route,
//     Switch,
// } from 'react-router-dom';

import { router } from 'dva';

import { Apps } from '@levi-a/demo';
// import { demoRoutes } from '@levi-a/demo';
import { loadLazyModule } from '@levi-m/core-ui';

function RouterConfig({ history }: router.RouterProps) {
    return (
        <router.Router history={history}>
            {/* 只能有一个根节点 */}
            <router.Switch>
                {/* 页面路由,一个 Route 代表一个页面 */}
                {/* 4.0  版本开始允许加载多个路由，所以建议加上 exact 进行精准匹配*/}
                <router.Route key="/apps" path="/apps" component={Apps} />
                <router.Route key="/home" path="/home" component={loadLazyModule(() => import("@levi-a/home"))} />
                <router.Route key="/users" path="/users" component={loadLazyModule(() => import("@levi-a/user"))} />
                {/* <Route exact key="/about" path="/about" component={About} /> */}
                {/* 嵌套路由，不能在父级加 exact，因为先要匹配父级然后才能匹配子集 */}
                {/* 比如：/hello/helloA ， 会先匹配父级 /hello 后才能匹配 /hello/helloA */}
                <router.Route key="/kek" path="/kek" component={loadLazyModule(() => import("@levi-a/demo"))} />
                {/* <Route key="/kek" path="/kek" component={demoRoutes} /> */}
                <router.Route path='/hello' render={() => <div>你好</div>}></router.Route>
                <router.Redirect to="/home" />
            </router.Switch>
        </router.Router>
    )
}

export default RouterConfig;