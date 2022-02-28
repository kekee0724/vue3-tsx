import './index.less';

import React, { useState } from 'react';

import { Button, Form, Input } from 'antd';
import { connect, Loading, PostModelState, Posts } from 'umi';

import Page from './components/Page';

const { TextArea } = Input;

const PostsAdd = (props: any) => {
  const { dispatch } = props;
  const [isLoading, setIsLoading] = useState(false);

  const addPosts = (data: Posts) => {
    setIsLoading(true);
    dispatch({
      type: 'posts/addPosts',
      data,
      callback: () => setIsLoading(false),
    });
  };

  const [form] = Form.useForm();
  const handleOk = (values: any) => {
    addPosts(values);
  };
  const validateMessages = {
    required: "'${label}' 是必选字段",
    // ...
  };

  return (
    <Page title={''} subTitle={'新日记条目'}>
      <Form
        form={form}
        // layout="vertical"
        onFinish={handleOk}
        validateMessages={validateMessages}
      >
        <Form.Item
          rules={[{ required: true }]}
          label="标题"
          name="title"
          required
          // tooltip="标题"
        >
          <Input placeholder="日记条目标题..." />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label="内容"
          name="content"
          required
        >
          <TextArea
            showCount
            placeholder="日记条目内容..."
            // maxLength={140}
            style={{ height: 120 }}
            // onChange={onChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
            style={{ float: 'right' }}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </Page>
  );
};

const mapStateToProps = ({
  posts: state,
  loading,
}: {
  posts: PostModelState;
  loading: Loading;
}) => ({ state, loading: loading.models.posts });

export default connect(mapStateToProps)(PostsAdd);
