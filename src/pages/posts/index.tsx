import './index.less';

import React, { useState } from 'react';

import { Card, Col, Row } from 'antd';
import { connect, Link, Loading, PostModelState } from 'umi';

import { InfiniteScroll } from '@/components/infinite-scroll';

import Page from './components/Page';
import PostsCard from './components/postsCard';
import styles from './components/postsCard.less';
import { getPosts } from './service';

const Posts = (props: any) => {
  const {
    state: { user },
  } = props;
  const [data, setData] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  async function loadMore() {
    const append = await getPosts({ page: pageIndex, count: 18 });
    setPageIndex(pageIndex + 1);
    setData((val) => [...val, ...append]);
    setHasMore(append.length == 18);
  }
  const postCards = data?.map((item: any, key: number) => (
    <Col key={key} lg={8} md={12} style={{ width: '100%' }}>
      <PostsCard {...item} />
    </Col>
  ));
  console.log(data);
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
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
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
