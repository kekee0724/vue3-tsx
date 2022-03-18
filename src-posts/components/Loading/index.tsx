import './index.less';

import { Space, Spin } from 'antd';

const PageLoading = () => {
  return (
    <div className="example">
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default PageLoading;
