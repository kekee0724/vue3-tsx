import React, { FC, useEffect, useState } from 'react';

import { Modal, Popconfirm } from 'antd';
import { Orders, TeacherSchedule } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { getAllClerks } from '../service';

export interface CourseSelectionProps {
  visible: boolean;
  onCancel: () => void;
  confirmLoading: boolean;
  addOrders: (courseId: number) => void;
  records: Array<string>;
}

export const CourseSelection: FC<CourseSelectionProps> = (props) => {
  const { visible, onCancel, confirmLoading, records, addOrders } = props;
  const [record, setRecord] = useState<TeacherSchedule[]>([]);
  useEffect(() => {
    // getAllCourse();
  }, [visible]);
  console.log(record, records);

  function IsInArray(arr: any[], val: number | string) {
    var testStr = ',' + arr.join(',') + ',';
    return testStr.indexOf(',' + val + ',') != -1;
  }

  const getAllCourse = async () => {
    const record = await getAllClerks();
    const newRecord: Array<TeacherSchedule> = record?.data?.filter(
      (reco: Orders) => !IsInArray(records, reco.name),
    );
    setRecord(newRecord);
  };

  const renderPopconfirm = (text: string, record: TeacherSchedule) => (
    <Popconfirm
      key="popconfirm"
      title={`确认${text}吗?`}
      okText="是"
      cancelText="否"
      onConfirm={() => addOrders(record.id)}
    >
      <a>{text}</a>
    </Popconfirm>
  );

  const columns: ProColumns<TeacherSchedule>[] = [
    {
      dataIndex: 'id',
      title: 'id',
      valueType: 'text',
      // width: 150,
    },
    {
      dataIndex: 'name',
      title: '课程名',
      valueType: 'text',
      // width: 150,
    },
    {
      dataIndex: 'period',
      title: '学时',
    },
    {
      dataIndex: 'teacherName',
      title: '老师',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'date',
      key: 'updateTime',
    },
    {
      title: '启用',
      dataIndex: 'isValid',
      valueType: 'switch',
      key: 'isValid',
    },
    {
      title: '操作',
      dataIndex: 'x',
      valueType: 'option',
      render: (_, record) => {
        let node = record.isValid ? renderPopconfirm('选课', record) : '选课';
        return [node];
      },
    },
  ];

  return (
    <div>
      <Modal
        title={'学生选课'}
        visible={visible}
        onOk={onCancel}
        onCancel={onCancel}
        forceRender
        confirmLoading={confirmLoading}
        width={800}
      >
        <ProTable<TeacherSchedule>
          columns={columns}
          dataSource={record}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showQuickJumper: true,
          }}
          toolBarRender={false}
          search={false}
        />
      </Modal>
    </div>
  );
};
