import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import About from '@levi-a/about'

export class Demo extends Component {
    constructor(props: any) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                这是Demo页面的内容！
                <Switch>
                    <Route path='/demo/children' component={About} />
                </Switch>
            </div>
        );
    }
}

export default Demo;