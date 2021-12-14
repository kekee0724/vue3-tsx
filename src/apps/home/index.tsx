import { match, Route, Switch } from 'react-router-dom';

import Home from './home';

export { Home };

export const routes = ({ match }: any, renderRoutes?: (match: match) => React.ReactNode) => {
    renderRoutes = typeof renderRoutes === "function" ? renderRoutes : () => null;
    return (
        <>
            <Route path={match.path} component={Home} />
            <Switch>
                <Route path={`${match.path}/home`} component={Home} />
                {/* <Route
                    path={`${match.path}/detail`}
                    render={({ match }) => (
                        <Switch>
                            {renderRoutes(match)}
                            <Route path={match.path} component={Home} />
                        </Switch>
                    )}
                /> */}
                {renderRoutes(match)}
            </Switch>
        </>
    );
};
