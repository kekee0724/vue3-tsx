import './users.less';

import React, {
  FC,
  useState,
} from 'react';

import { Dialog, Image, List, SwipeAction } from 'antd-mobile';
import { Action } from 'antd-mobile/es/components/swipe-action';
import { connect } from 'dva';

const users = [
  {
    avatar:
      'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Novalee Spicer',
    description: 'Deserunt dolor ea eaque eos',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
    name: 'Sara Koivisto',
    description: 'Animi eius expedita, explicabo',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Marco Gregg',
    description: 'Ab animi cumque eveniet ex harum nam odio omnis',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Edith Koenig',
    description: 'Commodi earum exercitationem id numquam vitae',
  },
]

export const Users = connect(mapStateToProps)((props: any) => {
  const { countNamespace: state } = props;
  console.log(props, state)
  return (
    <>
      <DemoBlock title='用户列表' padding='0' border='0'>
        <WithList />
      </DemoBlock>
      <DemoBlock title='用户列表' padding='0' border='none'>
        <List>
          {users.map(user => (
            <List.Item
              key={user.name}
              prefix={
                <Image
                  src={user.avatar}
                  style={{ borderRadius: 20 }}
                  fit='cover'
                  width={40}
                  height={40}
                />
              }
              description={user.description}
            >
              {user.name}
            </List.Item>
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

function mapStateToProps() {
  return {};
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
  console.log(title, padding, border, children)
  return <div>
    {/* <p>我是message页面,name是：{name}</p>
    <p>我是message页面,count是：{count}</p>
    <button onClick={() => setName('jane')}>点击我改变name</button>
    <br />
    <button onClick={addCount}>点击我改变count</button> */}
    <div className="demoBlock">
      <div className="title">{props.title}</div>
      <div className="content" style={{ padding: (props.padding || 0) + "px", background: "rgb(255, 255, 255)", border: (props.border || 0) + "px" || "none" }}>
        {props.children}
      </div>
    </div>
  </div>;
}