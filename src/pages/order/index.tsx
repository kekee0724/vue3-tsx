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
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { getLocalStorage, setLocalStorage } from '@/utils/storage';

import { ClerkSelection } from './components/clerk.selection.modal';
import { OrderAddModal } from './components/order.add.modal';

const token = getLocalStorage('authsessiontoken')
  ? JSON.parse(getLocalStorage('authsessiontoken'))
  : { name: '' };
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
  const {
    result: {
      data: { orders },
      meta: { page: pageIndex, pageSize: pageSize, total },
    },
  } = state;

  const columns: ProColumns<Orders>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      valueType: 'digit',
      key: 'id',
    },
    {
      title: '店名',
      dataIndex: 'storeName',
      key: 'storeName',
      valueType: 'text',
      // render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: '验光师',
      dataIndex: 'clerkName',
      key: 'clerkName',
      valueType: 'text',
    },
    {
      title: '顾客',
      dataIndex: 'customerName',
      key: 'customerName',
      valueType: 'text',
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
    setLocalStorage('authsessiontoken', '');
    history.push('/login');
  };

  return (
    <div className="list-table">
      <ProTable
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
