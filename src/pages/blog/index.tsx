import React, { useState } from "react";

import { Button, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";

const Blog = () => {
  const [blogTitle, setBlogTitle] = useState("kekee.xyz");
  const [articleList, setArticleList] = useState([])
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
    </View>
  );
};

export default Blog;
