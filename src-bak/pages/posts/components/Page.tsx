import React from 'react';

import { PageHeader } from 'antd';
import { history } from 'umi';

import { setLocalStorage } from '@/utils/storage';

const Page = (props: any) => {
  const { children, title, subTitle } = props;

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={title}
        subTitle={subTitle}
        extra={[
          <a
            key="1"
            type="primary"
            style={{ lineHeight: '32px' }}
            onClick={() => {
              setLocalStorage('authsessiontoken', '');
              history.push('/login');
            }}
          >
            退出
          </a>,
        ]}
      >
        {children}
      </PageHeader>
    </div>
  );
};

export default Page;
