import './index.less';

import React from 'react';

import { Card, Col, Row } from 'antd';
import { connect, history, Link, Loading, PostModelState } from 'umi';

import Page from './components/Page';
import PostsCard from './components/postsCard';
import styles from './components/postsCard.less';

const Posts = (props: any) => {
  const { state } = props;
  const { posts, user } = state;
  const postCards = posts?.map((item: any, key: number) => (
    <Col key={key} lg={8} md={12} style={{ width: '100%' }}>
      <PostsCard {...item} />
    </Col>
  ));

  return (
    <Page title={user?.name} subTitle={'我的日记'}>
      <Row gutter={24}>
        <Col lg={8} md={12} style={{ width: '100%' }}>
          <Link to={`posts/add`}>
            <Card
              className={styles.postsCard}
              // bordered={false}
              size="small"
              // onClick={() => history.push('/posts/add')}
            >
              <div
                className={styles.content}
                style={{ fontSize: '120px', fontWeight: 200 }}
              >
                +
              </div>
            </Card>
          </Link>
        </Col>
        {postCards}
      </Row>
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

export default connect(mapStateToProps)(Posts);
