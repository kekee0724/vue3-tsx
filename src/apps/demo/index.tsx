import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import About from '@levi-a/about'
import { Button } from 'antd-mobile';

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
                <Button color="primary" onClick={()=>this.redirectHandle()}>Primary Button</Button>
                <Switch>
                    <Route path={`${this.props.match.path}/admin`} component={About} />
                </Switch>
            </div>
        );
    }
}

export default Demo;