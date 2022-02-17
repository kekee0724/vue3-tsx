import { Users } from "./users";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Apps } from "./count";

export { Users };

export const routes = ({ match }: any) => (
    <Switch>
        <Route path={`${match.path}`} component={Users} />
        {/* <Route path={`${match.path}`} component={Apps} /> */}
    </Switch>
);