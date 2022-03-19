import { FC, useEffect, useState } from 'react';

import { Button, message } from 'antd';
import {
  Clerks,
  connect,
  Dispatch,
  history,
  Loading,
  OrderModelState,
  Orders,
} from 'umi';
import EditableProTable, { ProColumns } from '@ant-design/pro-table';

import { getLocalStorage, removeLocalStorage } from '@/utils/storage';

import { ClerkSelection } from './components/clerk.selection.modal';
import { OrderAddModal } from './components/order.add.modal';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export interface OrderPageProps {
  state: OrderModelState;
  dispatch: Dispatch;
  loading: boolean;
}

const OrderListPage: FC<OrderPageProps> = ({ state, dispatch, loading }) => {
  useEffect(() => {
    getOrders(1, 5);
  }, []);

  const [orderAddVisible, setOrderAddVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [clerk, setClerk] = useState<Partial<Clerks>>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const {
    result: {
      data: { orders },
      meta: { page: pageIndex, pageSize: pageSize, total },
    },
  } = state;

  const editOrdered = (data: Orders) => {
    dispatch({
      type: 'orders/editOrdered',
      data,
      callback: (res) => {
        if (res) {
          message.success(JSON.stringify(res.data));
          getOrders(pageIndex, pageSize);
        } else {
          message.error(`修改失败.`);
        }
      },
    });
  };

  const columns: ProColumns<Orders>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      valueType: 'digit',
      editable: false,
      key: 'id',
    },
    {
      title: '店名',
      dataIndex: 'storeName',
      key: 'storeName',
      valueType: 'text',
      editable: false,
      // render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: '验光师',
      dataIndex: 'clerkName',
      key: 'clerkName',
      valueType: 'text',
      editable: false,
    },
    {
      title: '顾客',
      dataIndex: 'customerName',
      key: 'customerName',
      valueType: 'text',
      editable: false,
    },
    {
      title: '预定时间',
      dataIndex: 'orderTime',
      valueType: 'dateTime',
      key: 'orderTime',
    },
    {
      title: '启用',
      dataIndex: 'isValid',
      valueType: 'switch',
      key: 'isValid',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      valueType: 'text',
    },
    {
      title: '操作',
      valueType: 'option',
      // width: 100,
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

  const getOrders = (index?: number, size?: number) => {
    dispatch({
      type: 'orders/getOrders',
      data: { page: index || pageIndex, pageSize: size || pageSize },
    });
    return undefined;
  };

  const add = () => {
    setModalVisible(true);
  };

  const selectClerk = (clerk: Clerks) => {
    setConfirmLoading(false);
    setModalVisible(false);
    setClerk(clerk);
    setOrderAddVisible(true);
  };

  const onFinish = (record: Clerks) => {
    record = { ...clerk, ...record };
    console.log(record);
    setConfirmLoading(true);
    dispatch({
      type: 'orders/addOrders',
      data: record,
      callback: (res) => {
        if (res) {
          setConfirmLoading(false);
          setOrderAddVisible(false);
          message.success(`预约成功.`);
          getOrders(pageIndex, pageSize);
        } else {
          setConfirmLoading(false);
          message.error(`预约失败.`);
        }
      },
    });
  };

  const logout = () => {
    removeLocalStorage('authsessiontoken');
    history.push('/login');
  };

  const token =
    getLocalStorage('authsessiontoken') &&
    JSON.parse(getLocalStorage('authsessiontoken'));

  return (
    <div className="list-table">
      <EditableProTable<Orders>
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="id"
        search={false}
        // pagination={false}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
        }}
        options={{
          density: true,
          fullScreen: true,
          reload: () => {
            getOrders(pageIndex, pageSize);
          },
          setting: true,
        }}
        // onChange={setDataSource}
        editable={{
          // type: 'multiple',
          // defaultDom = {save,cancel,delete} 可以酌情添加和使用
          actionRender: (row, config, defaultDom) => [
            defaultDom.save,
            defaultDom.cancel,
          ],
          editableKeys,
          onSave: async (rowKey, data, row) => {
            // console.log(rowKey, data, row);
            editOrdered(data);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
        headerTitle={`${token?.name}，欢迎你`}
        toolBarRender={() => [
          <Button type="primary" onClick={add}>
            预约
          </Button>,
          <Button onClick={() => getOrders()}>刷新</Button>,
          <Button type="dashed" danger onClick={logout}>
            退出
          </Button>,
        ]}
      />
      <ClerkSelection
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        confirmLoading={confirmLoading}
        selectClerk={selectClerk}
        records={orders.map((stud) => stud.name)}
      />
      <OrderAddModal
        visible={orderAddVisible}
        onCancel={() => setOrderAddVisible(false)}
        clerk={clerk}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
      />
    </div>
  );
};

// 简写
const mapStateToProps = ({
  orders: state,
  loading,
}: {
  orders: OrderModelState;
  loading: Loading;
}) => ({ state, loading: loading.models.orders });

export default connect(mapStateToProps)(OrderListPage);
