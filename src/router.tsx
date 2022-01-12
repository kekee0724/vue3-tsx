import { router } from 'dva';

import About from '@reco-m/about';
import Index from '@reco-m/home';

function RouterConfig({ history }: router.RouterProps) {
    return (
        <router.Router history={history}>
            {/* 只能有一个根节点 */}
            <router.Switch>
                <router.Route key="/home" path="/home" component={Index} />
                <router.Route key="/about" path="/about" component={About} />
                <router.Redirect to="/home" />
            </router.Switch>
        </router.Router>
    )
}

export default RouterConfig;
