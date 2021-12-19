import { FunctionComponent, SetStateAction, useEffect, useState } from 'react';

import { Space, Table, Tag } from 'antd';

import { connect, Dispatch, Loading, User, UserModelState } from 'umi';
import { UserModal } from './components/user.modal';
interface UsersProps {
  state: UserModelState;
  dispatch: Dispatch;
  loading: boolean;
}

const Users: FunctionComponent<UsersProps> = ({ state, dispatch, loading }) => {
  // useEffect(() => {
  //   getRecord(1, 5)
  // }, [])

  const {
    result: {
      data: users,
      meta: { page: pageIndex, per_page: pageSize, total },
    },
  } = state;
  console.log(state);
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState<Partial<User>>({});

  const showModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const getRecord = (pageIndex: number, pageSize: number) =>
    dispatch({
      type: 'users/getRecord',
      data: { page: pageIndex, per_page: pageSize },
    });

  const edit = (record: User) => {
    showModal();
    setRecord(record);
  };

  const onFinish = (values: User) => {
    const { id } = record;
    if (id) {
      dispatch({
        type: 'users/editRecord',
        data: {
          id,
          values,
        },
      });
    } else {
      dispatch({
        type: 'users/addRecord',
        data: {
          values,
        },
      });
    }
    getRecord(pageIndex, pageSize);
    closeModal();
  };
  const confirm = (values: any) => {
    const { id } = record;
    dispatch({
      type: 'users/getRecord',
      params: values,
    });
  };
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: { name: string }) => (
        <Space size="middle">
          <a onClick={() => edit(record)}>编辑 {record.name}</a>
          <a onClick={showModal}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="list-table">
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pageIndex,
          total,
          pageSize,
          onChange: (pageIndex, pageSize) => {
            getRecord(pageIndex, pageSize);
          },
        }}
      />
      <UserModal
        visible={modalVisible}
        // onOk={closeModal}
        onCancel={closeModal}
        record={record}
        onFinish={onFinish}
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

export default connect(mapStateToProps)(Users);
