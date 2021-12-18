import { FunctionComponent } from 'react';

import { Space, Table, Tag } from 'antd';

import { connect } from 'umi';
interface UsersProps {
  state: any;
}

const Users: FunctionComponent<UsersProps> = ({ state }) => {
  const { list: users } = state;
  console.log(state);
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
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (tags: any[]) => (
    //     <>
    //       {tags.map((tag: string) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: { name: string }) => (
        <Space size="middle">
          <a>编辑 {record.name}</a>
          <a>删除</a>
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
