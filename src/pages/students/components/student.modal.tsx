import React, { FC, useEffect, useState } from 'react';

import { Modal, Popconfirm } from 'antd';
import { Teacher, Student } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { listAllCourses } from '../service';

export interface CoursesModalProps {
  visible: boolean;
  onCancel: () => void;
  confirmLoading: boolean;
  addRecord: (courseId: number) => void;
  records: Array<string>;
}

export const CoursesModal: FC<CoursesModalProps> = (props) => {
  const { visible, onCancel, confirmLoading, records, addRecord } = props;
  const [record, setRecord] = useState<Teacher[]>([]);
  useEffect(() => {
    getAllCourses();
  }, [visible]);
  console.log(record, records);

  function IsInArray(arr: any[], val: number | string) {
    var testStr = ',' + arr.join(',') + ',';
    return testStr.indexOf(',' + val + ',') != -1;
  }

  const getAllCourses = async () => {
    const record = await listAllCourses();
    const newRecord = record.data.filter(
      (reco: Student) => !IsInArray(records, reco.name),
    );
    setRecord(newRecord);
  };

  const renderPopconfirm = (text: string, record: Teacher) => (
    <Popconfirm
      key="popconfirm"
      title={`确认${text}吗?`}
      okText="是"
      cancelText="否"
      onConfirm={() => addRecord(record.id)}
    >
      <a>{text}</a>
    </Popconfirm>
  );

  const columns: ProColumns<Teacher>[] = [
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
      title: '操作',
      dataIndex: 'x',
      valueType: 'option',
      render: (_, record) => {
        let node = renderPopconfirm('选课', record);
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
        <ProTable<Teacher>
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
