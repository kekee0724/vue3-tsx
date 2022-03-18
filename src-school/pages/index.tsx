import { useEffect } from 'react';

import { DatePicker } from 'antd';
import ProviderConfig from 'antd/es/config-provider';
import locale from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import { history, Link } from 'umi';

import { isAuth } from '@/utils/storage';

import styles from './index.less';

dayjs.locale('zh-cn');

export default function IndexPage() {
  useEffect(() => {
    if (!isAuth()) {
      history.push('/login');
    } else {
      history.push('/posts');
    }
  }, []);
  return (
    <div>
      <ProviderConfig locale={locale}>
        <h1 className={styles.title}>Page index</h1>
        <DatePicker
          onChange={(value) => {
            console.log(value);
          }}
        />
        <Link to="/login">login</Link>
      </ProviderConfig>
    </div>
  );
}
