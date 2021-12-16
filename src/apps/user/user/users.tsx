import './users.less';

import React, {
  FC,
  useState,
} from 'react';

import { Dialog, Image, List, SwipeAction, Badge } from 'antd-mobile';
import { Action } from 'antd-mobile/es/components/swipe-action';
import { connect } from 'dva';

export const Users = connect(mapStateToProps)(({ list: dataSource, total, page: current }: any) => {
  // const { countNamespace: state } = props;
  console.log(dataSource, total, current)
  const leftActions: (item: any) => Action[] = (item: any) => {
    return [
      {
        key: 'pin',
        text: '置顶',
        color: 'primary',
        onClick: async () => {
          await Dialog.confirm({
            content: '确定要置顶吗？',
          })
          console.log(item.id)
        },
      },
    ]
  }
  const rightActions: (item: any) => Action[] = (item: any) => [
    // {
    //   key: 'unsubscribe',
    //   text: '取消关注',
    //   color: 'light',
    // },
    {
      key: 'mute',
      text: '编辑',
      color: 'warning',
      onClick: async () => {
        await Dialog.confirm({
          content: '确定要编辑吗？',
        })
        console.log(item.id)
      },
    },
    {
      key: 'delete',
      text: '删除',
      color: 'danger',
      onClick: async (e: any) => {
        await Dialog.confirm({
          content: '确定要删除吗？',
        })
        console.log(item.id)
      },
    },
  ]
  return (
    <>
      {/* <DemoBlock title='用户列表' padding='0' border='0'>
        <WithList />
      </DemoBlock> */}
      <DemoBlock title='用户列表' padding='0' border='none'>
        <List>
          {dataSource.map((user: { id: number, name: string, username: string, email: string, website: string }) => (
            <SwipeAction
              key={user.email}
              leftActions={leftActions(user)}
              rightActions={rightActions(user)}
            >
              <List.Item
                prefix={
                  <div className="comp-box margin-v-xs">
                    <Badge>
                      <div>{user.username?.slice(0, 4)}</div>
                    </Badge>
                  </div>
                }
                description={<><div>{user.website}</div><div>{user.email}</div></>}
              >
                {user.name}
              </List.Item>
            </SwipeAction>
          ))}
        </List>
      </DemoBlock>
      <DemoBlock title='卡片模式' padding='0' border='none'>
        <div style={{ background: '#eee', padding: '8px 0' }}>
          <List mode='card'>
            <List.Item title='这里是标题'>这里是主信息</List.Item>
            <List.Item title='这里是标题'>这里是主信息</List.Item>
          </List>
        </div>
      </DemoBlock>
    </>
  );
})

function mapStateToProps(state: { users: { list: any; total: any; page: any; }; }) {
  const { list, total, page } = state.users;
  return {
    list,
    total,
    page,
  };
}

// 配合列表使用
const WithList: FC = () => {
  const leftActions: Action[] = [
    {
      key: 'pin',
      text: '置顶',
      color: 'primary',
    },
  ]
  const rightActions: Action[] = [
    // {
    //   key: 'unsubscribe',
    //   text: '取消关注',
    //   color: 'light',
    // },
    {
      key: 'mute',
      text: '编辑',
      color: 'warning',
      onClick: async () => {
        await Dialog.confirm({
          content: '确定要编辑吗？',
        })
        // ref.current?.close()
      },
    },
    {
      key: 'delete',
      text: '删除',
      color: 'danger',
      onClick: async () => {
        await Dialog.confirm({
          content: '确定要删除吗？',
        })
        // ref.current?.close()
      },
    },
  ]
  const items = ['A', 'B', 'C']
  return (
    <List>
      {items.map(item => (
        <SwipeAction
          key={item}
          leftActions={leftActions}
          rightActions={rightActions}
        >
          <List.Item>{item}</List.Item>
        </SwipeAction>
      ))}
    </List>
  )
}

export interface DemoBlockProps {
  name?: string;
  address?: string,
  title: string;
  padding: string;
  border: string;
}

const DemoBlock: React.FC<DemoBlockProps> = (props) => {
  const [name, setName] = useState('angle');
  const [count, setCount] = useState(1);
  const addCount = () => {
    setCount(count + 1)
  }
  const { title, padding, border, children } = props;
  return <div>
    {/* <p>我是message页面,name是：{name}</p>
    <p>我是message页面,count是：{count}</p>
    <button onClick={() => setName('jane')}>点击我改变name</button>
    <br />
    <button onClick={addCount}>点击我改变count</button> */}
    <div className="demoBlock">
      <div className="title">{title}</div>
      <div className="content" style={{ padding: (padding || 0) + "px", background: "rgb(255, 255, 255)", border: (border || 0) + "px" || "none" }}>
        {children}
      </div>
    </div>
  </div>;
}