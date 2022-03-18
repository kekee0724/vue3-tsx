import { FC, useEffect, useState } from 'react';

import { Button, message } from 'antd';
import {
  connect,
  Dispatch,
  history,
  Loading,
  OrderModelState,
  OrderSchedule,
} from 'umi';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { getLocalStorage, setLocalStorage } from '@/utils/storage';

import { CourseSelection } from './components/course.selection.modal';
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
    getSchedules(1, 5);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {
    result: {
      data: { orders: orderSchedules },
      meta: { page: pageIndex, pageSize: pageSize, total },
    },
  } = state;

  const columns: ProColumns<OrderSchedule>[] = [
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
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      valueType: 'text',
    },
  ];

  const getSchedules = (index?: number, size?: number) => {
    dispatch({
      type: 'orders/getSchedules',
      data: { page: index || pageIndex, pageSize: size || pageSize },
    });
    return undefined;
  };

  const add = () => {
    setModalVisible(true);
  };

  const addSchedule = (courseId: number) => {
    setConfirmLoading(true);
    dispatch({
      type: 'orders/addSchedule',
      data: courseId,
      callback: (res) => {
        if (res) {
          setConfirmLoading(false);
          setModalVisible(false);
          message.success(`预约成功.`);
          getSchedules(pageIndex, pageSize);
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
        dataSource={orderSchedules}
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
            getSchedules(pageIndex, pageSize);
          },
          setting: true,
        }}
        headerTitle={`${token?.name}，欢迎你`}
        toolBarRender={() => [
          <Button type="primary" onClick={add}>
            预约
          </Button>,
          <Button onClick={() => getSchedules()}>刷新</Button>,
          <Button type="dashed" danger onClick={logout}>
            退出
          </Button>,
        ]}
      />
      <CourseSelection
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        confirmLoading={confirmLoading}
        addSchedule={addSchedule}
        records={orderSchedules.map((stud) => stud.name)}
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
