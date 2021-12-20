import React, { FC, useEffect } from 'react';

import { DatePicker, Form, Input, message, Modal, Switch } from 'antd';
import moment from 'moment';
import { User } from 'umi';

export interface UserModalProps {
  visible: boolean;
  record: Partial<User>;
  onCancel: () => void;
  onFinish: (values: Partial<User>) => void;
  confirmLoading: boolean;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export const UserModal: FC<UserModalProps> = (props) => {
  const { visible, record, onCancel, onFinish, confirmLoading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (record)
      form.setFieldsValue({
        ...record,
        create_time: moment(record.create_time),
        status: Boolean(record.status),
      });
    else form.resetFields();
  }, [visible]);

  const onOk = () => form.submit();

  const onFinishFailed = (e: any) => message.error(e.errorFields[0].errors[0]);

  return (
    <div>
      <Modal
        title={record ? '编辑 id: ' + record.id : '新增'}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        forceRender
        confirmLoading={confirmLoading}
      >
        <Form
          {...layout}
          name="basic"
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 20 }}
          form={form}
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
          initialValues={{
            status: true,
          }}
        >
          <Form.Item
            label="用户名"
            name="name"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="创建时间" name="create_time">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="启用" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
