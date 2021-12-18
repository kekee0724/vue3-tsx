import { DatePicker } from 'antd';
import ProviderConfig from 'antd/es/config-provider';
import locale from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';

import styles from './index.less';

dayjs.locale('zh-cn');

export default function IndexPage() {
  return (
    <div>
      <ProviderConfig locale={locale}>
        <h1 className={styles.title}>Page index</h1>
        <DatePicker
          onChange={(value) => {
            console.log(value);
          }}
        />
      </ProviderConfig>
    </div>
  );
}
