import React, { FC, useEffect } from 'react';

import { DatePicker, Form, Input, message, Modal, Switch } from 'antd';
import moment from 'moment';
import { TeacherSchedule } from 'umi';

export interface CourseAddModalProps {
  visible: boolean;
  record: Partial<TeacherSchedule>;
  onCancel: () => void;
  onFinish: (values: Partial<TeacherSchedule>) => void;
  confirmLoading: boolean;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export const CourseAddModal: FC<CourseAddModalProps> = (props) => {
  const { visible, record, onCancel, onFinish, confirmLoading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (record?.id)
      form.setFieldsValue({
        ...record,
        updateTime: moment(new Date()),
        isValid: Boolean(record.isValid),
      });
    else form.resetFields();
  }, [visible]);

  const onOk = () => form.submit();

  const onFinishFailed = (e: any) => message.error(e.errorFields[0].errors[0]);

  return (
    <div>
      <Modal
        title={record?.id ? '编辑 id: ' + record?.id : '新增'}
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
            label="课程名"
            name="name"
            rules={[{ required: true, message: '请输入课程名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="学时" name="period">
            <Input />
          </Form.Item>
          <Form.Item
            label="更新时间"
            name="updateTime"
            initialValue={moment(new Date())}
          >
            <DatePicker disabled />
          </Form.Item>
          <Form.Item label="启用" name="isValid" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
