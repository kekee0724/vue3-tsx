// import { router } from "dva";
// import { loadLazyModule } from "@reco-m/core-ui";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Index from '@levi-a/index'
import About from '@levi-a/about'
import Demo from '@levi-a/demo'

function RouterConfig() {
  return (
    <Router>
      <Switch>
        <Route key="/" path="/" component={Index} />
        <Route key="/about" path="/about" component={About} />
        <Route key="/demo" path="/demo" component={Demo} />
        <Route path='/hello' render={(props) => <div>你好</div>}></Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default RouterConfig;