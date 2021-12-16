import React from 'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h3>嵌套路由</h3>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {/* <li>
                        <Link to="/about">About</Link>
                    </li> */}
                    <li>
                        <Link to="/kek/demo">Demo</Link>
                    </li>
                    <li>
                        <Link to="/kek/loading">Loading</Link>
                    </li>
                    <li>
                        <Link to="/kek/load">Load</Link>
                    </li>
                    <li>
                        <Link to="/kek/about">About</Link>
                    </li>
                    <li>
                        <Link to="/kek/func">Func</Link>
                    </li>
                    <li>
                        <Link to="/kek/class">Class</Link>
                    </li>
                </ul>

                <hr />
                {/* 子页面 */}
                {/* 所有子组件 */}
                {/* {this.props.children} */}
            </div>
        )
    }
}