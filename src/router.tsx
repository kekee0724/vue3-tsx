import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import About from '@reco-m/about';
import Index from '@reco-m/home';

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
