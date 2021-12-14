import React from 'react';

import { Action, AnyAction } from "redux";
import { SubscriptionAPI } from "dva";
import { LocationDescriptorObject } from 'history';

import { PureComponent } from './pure-component';
import { Location, Match, MessageInstance, PageWrap } from './type';
import { resolvePath } from '../utils/resolve';

const PREFIX_REG = /^(\\|\/)/;

export namespace CoreComponent {
    export interface IProps<S = any> extends PureComponent.IProps, SubscriptionAPI {
        location?: Location;
        match?: Match;
        staticContext?: any;
        wrap?: PageWrap;
        state?: Readonly<S>;
    }

    export interface IState extends PureComponent.IState {}

    export abstract class Base<P extends IProps = IProps, S = any> extends PureComponent.Base<P, S> {

        protected readonly namespace!: string;
        protected message: MessageInstance;

        constructor(props: P, context: any) {
            super(props, context);

            this.state = this.getInitState(props);
            this.message = this.createMessageTools();

            Promise.resolve().then(this.componentMount.bind(this));
        }

        protected getInitState(nextProps: Readonly<P>): Readonly<S> {
            return nextProps.state! as any || {};
        }

        protected componentMount() {}

        protected abstract createMessageTools(): MessageInstance;

        protected getHistory() {
            return this.props.history;
        }

        inputData(data: any) {
            return this.dispatch("input", data);
        }

        dispatch<A extends Action = AnyAction>(action: A | string, data?: any) {
            const target: any = typeof action === "string" ? { type: action, data } : action;

            if (!/\//.test(target.type)) {
                if (!this.namespace) throw new Error("必须通过属性 namespace 设置页面所属命名空间。");

                target.type = `${this.namespace}/${target.type}`;
            }

            target && (data && (target.data = data), (target.message = this.message));

            return this.props.dispatch(target);
        }

        getSearchParams(nextProps?: Readonly<P>) {
            const { match, location } = nextProps || this.props;

            return location && match && (match!.searchParams || (match!.searchParams = new URLSearchParams(this.props.location && this.props.location!.search)));
        }

        getSearchParam(key: string, nextProps?: Readonly<P>) {
            const { match } = nextProps || this.props;

            return (match && (match.searchParams || this.getSearchParams(nextProps)) && match.searchParams!.get(key)) || "";
        }

        renderEmbeddedView<P1, T extends React.Component<P1, React.ComponentState>, C extends React.ComponentClass<P1>>(
            component: React.ClassType<P1, T, C>,
            props?: React.ClassAttributes<T> & P1,
            ...children: React.ReactNode[]
        ) {
            const { history, location, match, staticContext, wrap } = this.props;

            return React.createElement(
                component,
                {
                    history,
                    location,
                    match,
                    staticContext,
                    wrap,
                    ...(props as any),
                },
                ...children
            );
        }

        goBack(e?: MouseEvent | boolean) {
            this.__goBack(e);
        }

        protected __goBack(e?: MouseEvent | boolean) {
            this.props.wrap ? this.props.wrap!.goBack(e) : this.getHistory().goBack();
        }

        goTo(path: string | LocationDescriptorObject, state?: any) {
            this.__goTo(this.resolveRoutePath(path, state), state);
        }

        protected __goTo(path: string | LocationDescriptorObject, state?: any) {
            this.getHistory().push(path as any, state);
        }

        jump(path: string | LocationDescriptorObject, state?: any) {
            this.__jump(this.resolveRoutePath(path, state), state);
        }

        protected __jump(path: string | LocationDescriptorObject, state?: any) {
            this.getHistory().replace(path as any, state);
        }

        protected resolveRoutePath(path: string | LocationDescriptorObject, _state?: any) {
            const { match } = this.props,
                history = this.getHistory();

            if ((match || history) && path) {
                let isString = typeof path === "string",
                    paths = isString ? (path as string) : (path as LocationDescriptorObject).pathname;

                if (!PREFIX_REG.test(paths!)) {
                    paths = resolvePath(match ? match!.url! : history.location.pathname, paths!);

                    isString ? (path = paths) : ((path as LocationDescriptorObject).pathname = paths);
                }
            }

            return path;
        }

    }
}
