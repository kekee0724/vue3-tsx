import React from 'react';

import { Card } from 'antd';
import moment from 'moment';
import { history, Link } from 'umi';

import styles from './postsCard.less';

function PostsCard({ created_at, title, id }: any) {
  return (
    <Link to={`/posts/detail/${id}`}>
      <Card
        className={styles.postsCard}
        bordered={false}
        loading={!created_at}
        extra={created_at && moment(created_at).format('YYYY年MM月DD日')}
        size="small"
        // onClick={() => history.push(`/posts/detail/${id}`)}
      >
        <div className={styles.content}>{title || 'No Content'}</div>
      </Card>
    </Link>
  );
}

export default PostsCard;
