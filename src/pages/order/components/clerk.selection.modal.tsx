import React, { FC, useEffect, useState } from 'react';

import { Modal, Popconfirm } from 'antd';
import { Orders, Clerks } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { getAllClerks } from '../service';

export interface ClerkSelectionProps {
  visible: boolean;
  onCancel: () => void;
  confirmLoading: boolean;
  selectClerk: (record: Clerks) => void;
  records: Array<string>;
}

export const ClerkSelection: FC<ClerkSelectionProps> = (props) => {
  const { visible, onCancel, confirmLoading, records, selectClerk } = props;
  const [record, setRecord] = useState<Clerks[]>([]);
  useEffect(() => {
    getAllClerk();
  }, [visible]);

  function IsInArray(arr: any[], val: number | string) {
    var testStr = ',' + arr.join(',') + ',';
    return testStr.indexOf(',' + val + ',') != -1;
  }

  const getAllClerk = async () => {
    const record = await getAllClerks();
    const newRecord: Array<Clerks> = record?.data?.filter(
      (reco: Orders) => !IsInArray(records, reco.name),
    );
    setRecord(newRecord);
  };

  const renderPopconfirm = (text: string, record: Clerks) => (
    <Popconfirm
      key="popconfirm"
      title={`确认${text}吗?`}
      okText="是"
      cancelText="否"
      onConfirm={() => selectClerk(record)}
    >
      <a>{text}</a>
    </Popconfirm>
  );

  const columns: ProColumns<Clerks>[] = [
    {
      dataIndex: 'id',
      title: 'id',
      valueType: 'text',
      // width: 150,
    },
    {
      dataIndex: 'storeName',
      title: '店名',
    },
    {
      dataIndex: 'address',
      title: '地址',
    },
    {
      title: '门店手机',
      dataIndex: 'storePhone',
      valueType: 'text',
      key: 'storePhone',
    },
    {
      dataIndex: 'name',
      title: '验光师',
      valueType: 'text',
      // width: 150,
    },
    {
      title: '验光师手机',
      dataIndex: 'clerkPhone',
      valueType: 'text',
      key: 'clerkPhone',
    },
    // {
    //   title: '启用',
    //   dataIndex: 'isValid',
    //   valueType: 'switch',
    //   key: 'isValid',
    // },
    {
      title: '操作',
      dataIndex: 'x',
      valueType: 'option',
      render: (_, record) => {
        // let node = record.isValid ? renderPopconfirm('预约', record) : '预约';
        let node = renderPopconfirm('预约', record);
        return [node];
      },
    },
  ];

  return (
    <div>
      <Modal
        title={'顾客预约'}
        visible={visible}
        onOk={onCancel}
        onCancel={onCancel}
        forceRender
        confirmLoading={confirmLoading}
        width={800}
      >
        <ProTable<Clerks>
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
