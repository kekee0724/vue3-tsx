import React, { FC, useState, useEffect } from 'react';

import { Modal } from 'antd';
import { Achieve, Dispatch } from 'umi';
import ProCard from '@ant-design/pro-card';
import { ProFormField } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export interface AchievesModalProps {
  visible: boolean;
  record: Array<Achieve>;
  onCancel: () => void;
  dispatch: Dispatch;
}

export const AchievesModal: FC<AchievesModalProps> = (props) => {
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
      title={`本门课选课学生总数：${record?.length}`}
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
        headerTitle="学生选课表及打分"
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
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </Modal>
  );
};
