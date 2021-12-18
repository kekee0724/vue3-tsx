import { FunctionComponent } from 'react';

import { Space, Table, Tag } from 'antd';

import { connect } from 'umi';
interface UsersProps {
  state: any;
}

const Users: FunctionComponent<UsersProps> = ({ state }) => {
  const { data: users } = state;
  console.log(state);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any[]) => (
        <>
          {tags.map((tag: string) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: { name: string }) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="list-table">
      <Table columns={columns} dataSource={users} />
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
