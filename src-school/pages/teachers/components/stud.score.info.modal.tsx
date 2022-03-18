import React, { FC, useEffect, useState } from 'react';

import { Modal } from 'antd';
import { Achieve, Dispatch } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export interface StudScoreInfoModalProps {
  visible: boolean;
  record: Array<Achieve>;
  onCancel: () => void;
  dispatch: Dispatch;
}

export const StudScoreInfoModal: FC<StudScoreInfoModalProps> = (props) => {
  const { visible, record, onCancel, dispatch } = props;
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<Achieve[]>();

  useEffect(() => {
    setDataSource(record);
  }, [record]);

  const editAchieve = (achieve: Achieve) => {
    dispatch({
      type: 'teachers/editAchieve',
      data: achieve,
    });
  };

  const columns: ProColumns<Achieve>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      tooltip: '学生选课id',
      editable: false,
      width: '15%',
    },
    {
      title: '课程名',
      dataIndex: 'course',
      editable: false,
      width: '15%',
    },
    {
      title: '选课学生',
      dataIndex: 'student',
      editable: false,
      // width: '15%',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'date',
      editable: false,
    },
    {
      title: '分数',
      dataIndex: 'score',
      valueType: 'digit',
      // editable: false,
      // width: '15%',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <Modal
      title={`本课程选课学生总数：${record?.length}`}
      visible={visible}
      onOk={onCancel}
      onCancel={onCancel}
      forceRender
      width={800}
      centered
      // confirmLoading={confirmLoading}
    >
      <EditableProTable<Achieve>
        rowKey="id"
        headerTitle="学生选课表(打分)"
        maxLength={5}
        recordCreatorProps={false}
        columns={columns}
        request={async () => ({
          data: record,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          // type: 'multiple',
          // defaultDom = {save,cancel,delete} 可以酌情添加和使用
          actionRender: (row, config, defaultDom) => [
            defaultDom.save,
            defaultDom.cancel,
          ],
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            editAchieve(data);
            await waitTime(200);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </Modal>
  );
};
