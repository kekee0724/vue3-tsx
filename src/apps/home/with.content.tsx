import React from 'react';

import { Mask } from 'antd-mobile';

import { MobileLogin } from './mobile.login';

// 自定义内容
export const WithContent = (props: { visible: any; setVisible: any; }) => {
  const { visible, setVisible } = props;
  return (
    <>
      <Mask visible={visible} onMaskClick={() => setVisible(false)}>
        <div className="login-content-box">
          <MobileLogin />
        </div>
      </Mask>
    </>
  )
}
