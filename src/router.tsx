// import { router } from "dva";
// import { loadLazyModule } from "@reco-m/core-ui";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Index from './apps/index'
import About from './apps/about'

function RouterConfig() {
    return (
        <Router>
            <Switch>
                <Route exact key="/" path="/">
                    <Index />
                </Route>
                <Route exact key="/about" path="/about">
                    <About />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

export default RouterConfig;