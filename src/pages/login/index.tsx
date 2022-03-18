import './index.less';

import React, { FC, Fragment, useState } from 'react';

import { Button, Form, Input, Radio, Row } from 'antd';
import { connect, Dispatch, Loading, LoginModelState } from 'umi';

import logo from './girl-icon.svg';

const FormItem = Form.Item;

export interface LoginPageProps {
  state: LoginModelState;
  dispatch: Dispatch;
  loading: boolean;
}

const Login: FC<LoginPageProps> = ({ state, dispatch, loading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleOk = (values: any) => {
    console.log(values);
    if (isLogin) {
      setIsLoading(true);
      dispatch({
        type: 'login/login',
        data: values,
        callback: () => setIsLoading(false),
      });
      return;
    }
    setIsLoading(true);
    dispatch({
      type: 'login/register',
      data: values,
      callback: () => setIsLoading(false),
    });
  };
  const validateMessages = {
    required: "'${name}' 是必选字段",
    // ...
  };
  return (
    <Fragment>
      <div className="form">
        <div className="logo">
          <img alt="logo" src={logo} />
        </div>
        <Form onFinish={handleOk} validateMessages={validateMessages}>
          {!isLogin && (
            <Fragment>
              <label>名字</label>
              <FormItem
                name="name"
                rules={[{ required: true, type: 'string' }]}
                hasFeedback
              >
                <Input placeholder={`名字`} />
              </FormItem>
            </Fragment>
          )}
          {!isLogin && (
            <Fragment>
              <label>手机号</label>
              <FormItem
                name="phone"
                rules={[
                  { required: true, message: '手机号不能为空' },
                  { pattern: /^1[0-9]{10}/, message: '请输入正确的手机号' },
                ]}
                hasFeedback
              >
                <Input placeholder={`手机号`} />
              </FormItem>
            </Fragment>
          )}
          <label>邮件地址</label>
          <FormItem
            name="email"
            rules={[{ required: true, type: 'email' }]}
            hasFeedback
          >
            <Input placeholder={`邮件地址`} />
          </FormItem>
          <label>密码</label>
          <FormItem name="password" rules={[{ required: true }]} hasFeedback>
            <Input type="password" placeholder={'密码'} required />
          </FormItem>
          {!isLogin && (
            <Fragment>
              <label>角色</label>
              <FormItem
                name="role"
                // label="角色"
                initialValue={'customer'}
                rules={[{ required: true, message: '请选择一个!' }]}
              >
                <Radio.Group>
                  <Radio.Button value="customer">顾客</Radio.Button>
                  <Radio.Button value="shopowner">店长</Radio.Button>
                  <Radio.Button value="clerk">验光师</Radio.Button>
                </Radio.Group>
              </FormItem>
            </Fragment>
          )}
          {isLogin && (
            <Row>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                登录
              </Button>
            </Row>
          )}
          {!isLogin && (
            <Row>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                注册
              </Button>
            </Row>
          )}
          <Row>
            <a
              to="#"
              className={'link'}
              onClick={() => {
                if (isLoading) return;
                setIsLogin(!isLogin);
              }}
              disabled={isLoading}
            >
              {isLogin ? '没有账号？注册' : '已有账号？去登录'}
            </a>
          </Row>
        </Form>
      </div>
    </Fragment>
  );
};

// 简写
const mapStateToProps = ({
  users: state,
  loading,
}: {
  users: LoginModelState;
  loading: Loading;
}) => ({ state, loading: loading.models.users });

export default connect(mapStateToProps)(Login);
