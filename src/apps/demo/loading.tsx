import React from "react";
import PropTypes from "prop-types";

import { NavBar } from "antd-mobile";

import { PureComponent } from "@levi-m/core";

export namespace Loadings {
    export interface IProps extends PureComponent.IProps {
        content?: any;
        showback?: boolean;
    }

    export interface IState extends PureComponent.IState { }

    export class Component<P extends IProps = IProps, S extends IState = IState> extends React.Component<P, S> {
        static contextTypes = {
            goBack: PropTypes.func,
        };

        static defaultProps = {
            content: <span>加载中...</span>,
            showback: true
        };

        protected goBack = () => this.context.goBack && this.context.goBack();

        // renderGoBack(): React.ReactNode {
        //     return null;
        // }

        renderBack() {
            const { showback } = this.props;
            console.log(showback, client?.showheader)
            return (showback && client.showheader) ? <NavBar className="loading-nav-bar" onBack={this.goBack.bind(this)} /> : null;
        }

        render() {
            const { content } = this.props;
            return (
                <div className="loading-spin-box">
                    {this.renderBack()}
                    <div className="loading-spin loading-spin-show-text loading-spin-spinning loading-spin-lg">
                        <span className="loading-spin-dot ng-star-inserted loading-spin-dot-spin">
                            <i />
                            <i />
                            <i />
                            <i />
                        </span>
                        <div className="loading-spin-text ng-star-inserted">{content}</div>
                    </div>
                </div>
            );
        }
    }
}
