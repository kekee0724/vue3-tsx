import React from 'react'
import { HashRouter as Router, Route, Link, Switch, useRouteMatch, useParams } from 'react-router-dom'

import Main from './Main'
import About from './About'
import Topic from './Topic'

import Home from './Home'
import NestedA from './NestedA'
import NestedB from './NestedB'

/**
 * 这个页面就是 最终输出页面
 * 在项目根目录的 index.js 文件里面
 * 
 * import Router from './pages/router_demo/router02/router';
 * ReactDOM.render(<Router />, document.getElementById('root'));
 */
export default class IRouter extends React.Component {

    render() {
        return (
            <>
                <Router>
                    {/* 只能有一个根节点 */}
                    <Home>
                        {/* 页面路由,一个 Route 代表一个页面 */}
                        {/* 4.0  版本开始允许加载多个路由，所以建议加上 exact 进行精准匹配*/}
                        <Route exact={true} path="/" component={Main}/>
                        <Route exact={true} path="/about" component={About}/>
                        <Route exact={true} path="/topic" component={Topic}/>
                        {/* 嵌套路由，不能在父级加 exact，因为先要匹配父级然后才能匹配子集 */}
                        {/* 比如：/nested/a ， 会先匹配父级 /nested 饭后才能匹配 /nested/a */}
                        <Route path="/nested" component={() => <Nested />} />
                    </Home>
                </Router>
            </>
        )
    }
}

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
            <hr/>
            {/* {props.children} */}
            <Switch>
                <Route exact path={path} component={() => <h3>嵌套路由</h3>}/>
                <Route  path={`${path}/nestedA`} component={NestedA}/>
                <Route  path={`${path}/nestedB`} component={NestedA}/>
            </Switch>
        </>
    )
}

// 嵌套路由的重点在于，嵌套路由，不能在父级加 exact(精准匹配)，因为先要匹配 父级 然后才能匹配 子集
// 比如：/nested/a ， 会先匹配父级 /nested 后才能匹配 /nested/a

// <Route path="/nested" component={() => <Nested />} />
// .......  分隔符 ...........

// // <Nested /> 组件的内部
// // 这里的 path 就是 /nested
// // `${path}/a` 就是 /nested/a
// <Switch>
//      <Route exact path={path} component={() => <h3>嵌套路由</h3>}/>
//      <Route  path={`${path}/a`} component={A}/>
//      <Route  path={`${path}/b`} component={B}/>
// </Switch>