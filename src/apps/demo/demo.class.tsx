import React, { Component } from 'react';

import { Button } from 'antd-mobile';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import About from '@levi-a/about';

//定义一个接口，目的是为后面的state提供类型，以便通过编译器的检查
interface test {
    name?: 'john',
    age?: 18
}
//这里的any用来定义props的类型，test接口用来定义this.state的类型
export class Demo extends Component<any, test>{
    constructor(props: any) {
        super(props);
        this.state = {
            name: 'john',
            age: 18
        }
    }

    redirectHandle = () => {
        this.goTo("/home");
    }

    goTo(url: any) {
        this.props.history.push(url);
    }

    render() {
        return (
            <div>
                <h3>这是Demo页面的内容！</h3>
                <Button color="primary" onClick={() => this.redirectHandle()}>Go Home</Button>
            </div>
        );
    }
}

export default Demo;