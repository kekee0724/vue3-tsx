import { FunctionComponent, SetStateAction, useState } from 'react';

import { Space, Table, Tag } from 'antd';

import { connect } from 'umi';
import { UserModal } from './components/user.modal';
interface UsersProps {
  state: any;
}

const Users: FunctionComponent<UsersProps> = ({ state }) => {
  const { list: users } = state;
  console.log(state);
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);

  const showModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const edit = (record: any) => {
    setModalVisible(true);
    setRecord(record);
  };
  const columns = [
    {
      title: '名字',
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
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
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
      <Table columns={columns} dataSource={users} />
      <UserModal
        visible={modalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        record={record}
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
const mapStateToProps = ({ users: state }: any) => ({ state });

export default connect(mapStateToProps)(Users);
