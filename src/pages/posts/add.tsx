import './index.less';

import React, { useState } from 'react';

import { Button, Form, Input } from 'antd';
import { connect, Loading, PostModelState, Posts } from 'umi';

import Page from './components/Page';

// type RequiredMark = boolean | 'optional';
const { TextArea } = Input;

const PostsAdd = (props: any) => {
  const { state, match, dispatch } = props;
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   console.log(match.params.id);
  //   dispatch({
  //     type: 'posts/getPostsDetail',
  //     id: match.params.id,
  //   });
  // }, []);

  const addPosts = (data: Posts) => {
    setIsLoading(true);
    dispatch({
      type: 'posts/addPosts',
      data,
      callback: () => setIsLoading(false),
    });
  };

  // const { posts, user } = state;
  const [form] = Form.useForm();
  // const [requiredMark, setRequiredMarkType] =
  //   useState<RequiredMark>('optional');

  // const onRequiredTypeChange = ({
  //   requiredMarkValue,
  // }: {
  //   requiredMarkValue: RequiredMark;
  // }) => {
  //   console.log(requiredMarkValue);
  //   setRequiredMarkType(requiredMarkValue);
  // };

  const handleOk = (values: any) => {
    console.log(values);
    addPosts(values);
    // if (isLogin) {
    //   setIsLoading(true);
    //   dispatch({
    //     type: 'login/login',
    //     data: values,
    //     callback: () => setIsLoading(false),
    //   });
    //   return;
    // }
  };
  return (
    <Page title={''} subTitle={'新日记条目'}>
      <Form
        className="form"
        form={form}
        layout="vertical"
        // initialValues={{ requiredMarkValue: requiredMark }}
        // onValuesChange={onRequiredTypeChange}
        onFinish={handleOk}
      >
        <Form.Item
          label="标题"
          name="title"
          required
          // tooltip="标题"
        >
          <Input placeholder="日记条目标题..." />
        </Form.Item>
        <Form.Item label="内容" name="content" required>
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
