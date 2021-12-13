import React from 'react'
import { HashRouter as Router, Route, Link, Switch, useRouteMatch, useParams } from 'react-router-dom'
import Demo from '.'

/**
 * 函数组件
 * @param {*} _props 
 */
 export function Nested(_props: any) {
    // 获取route的匹配数据
    // path 路径， url 路径, params 参数
    const { path, url, params } = useRouteMatch()
    // 获取 path 参数, http://localhost:3000/a/:number
    // const { number } = useParams()

    console.log(path, url, params)
    return (
        <>
            <ul>
                <li>
                    <Link to={`${path}/nestedA`}>Nested A页面</Link>
                </li>
                <li>
                    <Link to={`${path}/nestedB`}>Nested B页面</Link>
                </li>
            </ul>
            <hr />
            {/* {props.children} */}
            {/* <Nested /> 组件的内部
            这里的 path 就是 /nested
            `${path}/nestedA` 就是 /nested/nestedA */}
            <Switch>
                <Route exact path={path} component={() => <h3>嵌套路由</h3>} />
                <Route path={`${path}/nestedA`} component={Demo} />
            </Switch>
        </>
    )
}