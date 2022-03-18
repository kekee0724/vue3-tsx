import '../index.less';

import React, { useEffect } from 'react';

import { Card } from 'antd';
import moment from 'moment';
import { connect, Loading, PostModelState } from 'umi';

import Page from '../components/Page';

const PostsDetail = (props: any) => {
  const { state, match, dispatch } = props;
  const { postsDetail } = state;

  useEffect(() => {
    dispatch({
      type: 'posts/getPostsDetail',
      id: match.params.id,
    });
    // return () => {
    //   effect;
    // };
  }, []);

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
