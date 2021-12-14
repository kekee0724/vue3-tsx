// import { router } from "dva";
// import { loadLazyModule } from "@reco-m/core-ui";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { routes } from '@levi-a/demo';
import { Home } from '@levi-a/home';

function RouterConfig() {
  return (
    <Router>
      {/* 只能有一个根节点 */}
      <Switch>
        {/* 页面路由,一个 Route 代表一个页面 */}
        {/* 4.0  版本开始允许加载多个路由，所以建议加上 exact 进行精准匹配*/}
        <Route exact key="/home" path="/home" component={Home} />
        {/* <Route exact key="/about" path="/about" component={About} /> */}
        {/* 嵌套路由，不能在父级加 exact，因为先要匹配父级然后才能匹配子集 */}
        {/* 比如：/hello/helloA ， 会先匹配父级 /hello 后才能匹配 /hello/helloA */}
        <Route key="/kek" path="/kek" component={routes} />
        <Route path='/hello' render={(props) => <div>你好</div>}></Route>
        <Redirect to="/home" />
      </Switch>
    </Router>
  )
}

export default RouterConfig;