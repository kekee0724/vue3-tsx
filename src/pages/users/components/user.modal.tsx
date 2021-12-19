import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, message } from 'antd';
import moment from 'moment';
export const UserModal = (props: any) => {
  const { visible, record, onCancel, onFinish, loading } = props;
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

  const onFinishFailed = (e) => message.error(e.errorFields[0].errors[0]);
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          form={form}
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
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
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
