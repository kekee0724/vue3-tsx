import '../index.less';

import React, { useEffect, useState } from 'react';

import { Card, Form, Input, Row } from 'antd';
import moment from 'moment';
import { connect, Loading, PostModelState } from 'umi';

import Page from '../components/Page';

type RequiredMark = boolean | 'optional';
const { TextArea } = Input;

const PostsDetail = (props: any) => {
  const { state, match, dispatch } = props;
  const { postsDetail } = state;
  console.log(postsDetail);
  useEffect(() => {
    console.log(match.params.id);
    dispatch({
      type: 'posts/getPostsDetail',
      id: match.params.id,
    });
    // return () => {
    //   effect;
    // };
  }, []);

  const { user } = state;

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] =
    useState<RequiredMark>('optional');

  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

  return (
    <Page title={''} subTitle={postsDetail?.title}>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={postsDetail?.title}
        loading={!postsDetail?.title}
        extra={
          postsDetail?.created_at &&
          moment(postsDetail?.created_at).format('YYYY年MM月DD日')
        }
      >
        {postsDetail?.content}
      </Card>
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

export default connect(mapStateToProps)(PostsDetail);
