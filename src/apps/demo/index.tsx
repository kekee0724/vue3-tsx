import React from 'react';

import { Loading } from 'antd-mobile';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import About from './about.function';
import { Apps } from './count';
import Demo from './demo.class';
import Home from './demo.home';
import { Loadings } from './loading';

export { About, Apps, Demo };

export const routes = ({ match }: any) => (
    <Switch>
        <Route exact path={`${match.path}`} component={Home} />
        <Route path={`${match.path}/demo`} component={Demo} />
        <Route path={`${match.path}/loading`} component={Loading} />
        <Route path={`${match.path}/load`} component={Loadings.Component} />
        <Route path={`${match.path}/about`} component={About} />
    </Switch>
);


/**
 * 函数组件
 * export const routes
 * @param {*} _props 
 */
export function demoRoutes(_props: any) {
    // 获取route的匹配数据
    // path 路径， url 路径, params 参数
    const { path, url, params } = useRouteMatch()
    // 获取 path 参数, http://localhost:3000/a/:number
    // const { number } = useParams()
    console.log(path, url, params)
    return (
        <>
            {/* <ul>
                <li>
                    <Link to={`${path}/nestedA`}>Nested A页面</Link>
                </li>
                <li>
                    <Link to={`${path}/nestedB`}>Nested B页面</Link>
                </li>
            </ul>
            <hr /> */}
            {/* {props.children} */}
            {/* <routes /> 组件的内部
            这里的 path 就是 /nested
            `${path}/nestedA` 就是 /nested/nestedA */}
            <Switch>
                {/* <Route exact path={path} component={() => <h3>嵌套路由</h3>} /> */}
                <Route exact path={`${path}`} component={Home} />
                <Route path={`${path}/demo`} component={Demo} />
                <Route path={`${path}/about`} component={About} />
            </Switch>
        </>
    )
}