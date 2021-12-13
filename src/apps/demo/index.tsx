import React, { Component } from 'react';

import { Button } from 'antd-mobile';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import About from '@levi-a/about';

export { Nested } from './demo';
export class Demo extends Component {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    redirectHandle = () => {
        console.log("aaa");
        this.props.history.push("/home");
    }

    render() {
        return (
            <div>
                这是Demo页面的内容！
                <Button color="primary" onClick={() => this.redirectHandle()}>Primary Button</Button>
            </div>
        );
    }
}

export default Demo;