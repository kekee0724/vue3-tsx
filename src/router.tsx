import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

// import { demoRoutes } from '@levi-a/demo';
import { loadLazyModule } from '@levi-m/core-ui';
import { Apps } from '@levi-a/demo';

function RouterConfig() {
    return (
        <Router>
            {/* 只能有一个根节点 */}
            <Switch>
                {/* 页面路由,一个 Route 代表一个页面 */}
                {/* 4.0  版本开始允许加载多个路由，所以建议加上 exact 进行精准匹配*/}
                <Route key="/apps" path="/apps" component={Apps} />
                <Route key="/home" path="/home" component={loadLazyModule(() => import("@levi-a/home"))} />
                {/* <Route exact key="/about" path="/about" component={About} /> */}
                {/* 嵌套路由，不能在父级加 exact，因为先要匹配父级然后才能匹配子集 */}
                {/* 比如：/hello/helloA ， 会先匹配父级 /hello 后才能匹配 /hello/helloA */}
                <Route key="/kek" path="/kek" component={loadLazyModule(() => import("@levi-a/demo"))} />
                {/* <Route key="/kek" path="/kek" component={demoRoutes} /> */}
                <Route path='/hello' render={() => <div>你好</div>}></Route>
                <Redirect to="/home" />
            </Switch>
        </Router>
    )
}

export default RouterConfig;