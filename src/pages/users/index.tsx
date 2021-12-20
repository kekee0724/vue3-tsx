import { FC, useEffect, useState, useRef } from 'react';

import { Button, message, Popconfirm } from 'antd';
import { connect, Dispatch, Loading, User, UserModelState } from 'umi';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { UserModal } from './components/user.modal';

export interface UserPageProps {
  state: UserModelState;
  dispatch: Dispatch;
  loading: boolean;
}

const UserListPage: FC<UserPageProps> = ({ state, dispatch, loading }) => {
  useEffect(() => {
    getRecord(1, 5);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<Partial<User>>({});

  const {
    result: {
      data: users,
      meta: { page: pageIndex, per_page: pageSize, total },
    },
  } = state;

  const columns: ProColumns<User>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      valueType: 'digit',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      valueType: 'text',
      render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      key: 'create_time',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: User) => [
        <a onClick={() => edit(record)}>编辑 {record.name}</a>,
        <Popconfirm
          title="确认删除这个用户吗?"
          onConfirm={() => {
            remove(record.id);
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getRecord = (index?: number, size?: number) => {
    alert(1);
    dispatch({
      type: 'users/getRecord',
      data: { page: pageIndex || index, per_page: size || pageSize },
    });
    return undefined;
  };

  const edit = (record: User) => {
    setModalVisible(true);
    setRecord(record);
  };

  const remove = (id: number) => {
    dispatch({
      type: 'users/deleteRecord',
      data: {
        id,
      },
      callback: (res) => {
        console.log('删除', res);
        if (res) {
          message.success('删除成功.');
          getRecord(pageIndex, pageSize);
        } else {
          message.error('删除失败.');
        }
      },
    });
  };

  const add = () => {
    setModalVisible(true);
    setRecord({});
  };

  const onFinish = (values: Partial<User>) => {
    setConfirmLoading(true);
    const { id } = record;

    let type;
    if (id) {
      type = 'users/editRecord';
    } else {
      type = 'users/addRecord';
    }

    dispatch({
      type,
      data: { id, values },
      callback: (res) => {
        if (res) {
          setConfirmLoading(false);
          setModalVisible(false);
          message.success(`${id === 0 ? '新增' : '编辑'}成功.`);
          getRecord(pageIndex, pageSize);
        } else {
          setConfirmLoading(false);
          message.error(`${id === 0 ? '新增' : '编辑'}失败.`);
        }
      },
    });
  };

  return (
    <div className="list-table">
      <ProTable
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        search={false}
        // pagination={false}
        pagination={{
          className: 'list-page',
          current: pageIndex,
          total,
          pageSize,
          onChange: (pageIndex, pageSize) => getRecord(pageIndex, pageSize),
          // onShowSizeChange: : (pageIndex, pageSize) => getRecord(pageIndex, pageSize),
          // showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
        options={{
          density: true,
          fullScreen: true,
          reload: () => {
            getRecord(pageIndex, pageSize);
          },
          setting: true,
        }}
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button type="primary" onClick={add}>
            新增
          </Button>,
          <Button onClick={() => getRecord()}>刷新</Button>,
        ]}
      />
      <UserModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        record={record}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
      ></UserModal>
    </div>
  );
};

// const mapStateToProps = ({ users: state }: any) => {
//   return {
//     state
//   }
// }

// 简写
const mapStateToProps = ({
  users: state,
  loading,
}: {
  users: UserModelState;
  loading: Loading;
}) => ({ state, loading: loading.models.users });

export default connect(mapStateToProps)(UserListPage);
