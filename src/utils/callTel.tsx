import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function callModal(
  content: string,
  onOk: () => void,
  onCancel: () => void,
  title: string,
) {
  Modal.confirm({
    title: title,
    icon: <ExclamationCircleOutlined />,
    content: content,
    okText: '确认',
    cancelText: '取消',
    onCancel,
    onOk,
  });
}

export function callTel(tel: string | undefined) {
  callModal(
    `您确定要拨打${tel}？`,
    () => {
      setTimeout(() => {
        window.location.href = 'tel:' + tel;
      }, 1000);
    },
    () => {},
    '拨号提示',
  );
}
