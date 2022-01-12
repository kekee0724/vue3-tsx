import React, {
  FC,
  useState,
} from 'react';

import { Button, Form, Image, Popup, Swiper } from 'antd-mobile';

import step1 from '@/assets/images/exchange/step1.png';
import step2 from '@/assets/images/exchange/step2.png';
import step3 from '@/assets/images/exchange/step3.png';
import step4 from '@/assets/images/exchange/step4.png';
import step5 from '@/assets/images/exchange/step5.png';
import step6 from '@/assets/images/exchange/step6.png';

export const WithPopup: FC = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Form.Item>
        <div className="blank22" />
        <Button
          color="primary"
          className="login-form-button"
          onClick={() => {
            setVisible(true)
          }}
        >
          兑换说明
        </Button>
      </Form.Item>
      <Popup position='bottom' visible={visible} destroyOnClose>
        <Swiper loop={false}>
          <Swiper.Item>
            <Image src={step1} />
          </Swiper.Item>
          <Swiper.Item>
            <Image src={step2} />
          </Swiper.Item>
          <Swiper.Item>
            <Image src={step3} />
          </Swiper.Item>
          <Swiper.Item>
            <Image src={step4} />
          </Swiper.Item>
          <Swiper.Item>
            <Image src={step5} />
          </Swiper.Item>
          <Swiper.Item>
            <Image src={step6} />
          </Swiper.Item>
          <Swiper.Item>
            <div
              className="contentFull"
              style={{ background: '#ffffff' }}
            >
              <Button
                onClick={() => {
                  setVisible(false)
                }}
              >
                开始使用
              </Button>
            </div>
          </Swiper.Item>
        </Swiper>
      </Popup>
    </>
  )
}
