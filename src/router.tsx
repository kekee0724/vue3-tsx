import { router } from 'dva';

import Index from '@reco-m/home';

function RouterConfig({ history }: router.RouterProps) {
    return (
        <router.Router history={history}>
            {/* 只能有一个根节点 */}
            <router.Switch>
                <router.Route key="/home" path="/home" component={Index} />
                <router.Redirect to="/home" />
            </router.Switch>
        </router.Router>
    )
}

export default RouterConfig;
