import React, { FC, useEffect } from 'react';

import { DatePicker, Form, Input, message, Modal } from 'antd';
import moment from 'moment';
import { Clerks } from 'umi';

export interface OrderAddModalProps {
  visible: boolean;
  clerk: Partial<Clerks> | undefined;
  onCancel: () => void;
  onFinish: (clerk: Clerks) => void;
  confirmLoading: boolean;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export const OrderAddModal: FC<OrderAddModalProps> = (props) => {
  const { visible, clerk, onCancel, onFinish, confirmLoading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (clerk?.id)
      form.setFieldsValue({
        ...clerk,
        orderTime: moment(new Date()),
        // isValid: Boolean(clerk.isValid),
      });
    else form.resetFields();
  }, [visible]);

  const onOk = () => form.submit();

  const onFinishFailed = (e: any) => message.error(e.errorFields[0].errors[0]);

  return (
    <div>
      <Modal
        title={`预约${clerk?.storeName}门店验光师${clerk?.name}`}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        forceRender
        confirmLoading={confirmLoading}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            isValid: true,
          }}
        >
          <Form.Item
            label="备注"
            name="remark"
            rules={[{ required: true, message: '备注必填' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="预约日期"
            name="orderTime"
            rules={[{ required: true }]}
            // initialValue={moment(new Date())}
          >
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
