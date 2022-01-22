import React, { useState } from "react";

import { List, Switch } from "antd-mobile";
import {
  PayCircleOutline,
  SetOutline,
  UnorderedListOutline,
} from "antd-mobile-icons";

import { Button, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";

const Blog = () => {
  const [blogTitle, setBlogTitle] = useState("kekee.xyz");
  const [articleList, setArticleList] = useState<Array<{ title: string }>>([])
  const testHandel = () => {
    Taro.request({
      url: "https://apiblog.jspang.com/default/getArticleList"
    }).then(
      res => {
        console.log(res.data);
        setArticleList(res.data.list)
      }
    )
  }

  const goToIndex = () => {
    Taro.navigateTo({ url: `pages/index/index?blogTitle=${blogTitle}` });
  };
  return (
    <View>
      <Text onClick={goToIndex}>Blog Page</Text>
      <Button onClick={testHandel}>获取列表</Button>
      {
        articleList.map((item, i) => {
          return (
            <View key={i}>
              {item.title}
            </View>
          )
        })
      }
      <List header='基础用法'>
        <List.Item>1</List.Item>
        <List.Item>2</List.Item>
        <List.Item>3</List.Item>
      </List>

      <List header='可点击的功能列表'>
        <List.Item prefix={<UnorderedListOutline />} onClick={() => { }}>
          账单
        </List.Item>
        <List.Item prefix={<PayCircleOutline />} onClick={() => { }}>
          总资产
        </List.Item>
        <List.Item prefix={<SetOutline />} onClick={() => { }}>
          设置
        </List.Item>
      </List>

      <List header='复杂布局'>
        <List.Item extra={<Switch defaultChecked />}>新消息通知</List.Item>
        <List.Item extra='未开启' clickable>
          大字号模式
        </List.Item>
        <List.Item description='管理已授权的产品和设备' clickable>
          授权管理
        </List.Item>
        <List.Item title='这里是标题'>这里是主信息</List.Item>
      </List>

      <List header='列表项禁用'>
        <List.Item disabled clickable prefix={<UnorderedListOutline />}>
          账单
        </List.Item>
        <List.Item disabled prefix={<PayCircleOutline />}>
          总资产
        </List.Item>
      </List>
    </View>
  );
};

export default Blog;
