import React, {
  useEffect,
  useState,
} from 'react';

import cloud from '@/assets/images/cloud.png';
import code from '@/assets/images/codewm.jpg';
import contentimg1 from '@/assets/images/contentimg1.png';
import goto from '@/assets/images/goto.png';

import { WithContent } from './WithContent';
const u = navigator.userAgent,
  isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
  isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  isdown = false;

//判断是否是微信浏览器的函数
const isWeiXin = () => {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  const ua = window.navigator.userAgent.toLowerCase();
  const userAgent = String(ua.match(/MicroMessenger/i))
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (userAgent === 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

function AppDown(terminalName: string) {
  console.log(terminalName)
  if (isdown) return;
}

const Index = (props: any) => {
  const [isQrCode, setIsQrCode] = useState(false)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    document.title = client.title
    // return () => {
    //   cleanup
    // }
  }, [])
  return (
    <div className="phone_warp">
      <div className="bd">
        <div>
          <div className="title">
            <span id="appName">{client.appName}<sup>+</sup></span>
            <em id="appTitle">{client.appTitle}</em>
          </div>
          <div className="content clearfix">
            <div className="contentimg" style={{ backgroundImage: `url(${contentimg1})` }}></div>
            <div className="icon1"></div>
            <div className="icon2"></div>
            <div className="icon3"></div>
            <div className="icon4"></div>
            <div className="start1"></div>
            <div className="start2"></div>
            <div className="dian1"></div>
            <div className="dian2"></div>
            <div className="ren"></div>
          </div>
        </div>
      </div>
      <div className="footer">
        <img src={cloud} />
        <a
          className={"ios " + (isiOS ? "on" : "")}
          // onClick={() => AppDown('Ios扫码下载')}
          // href={server.iosHref}
          onClick={() => setVisible(true)}
        ><i className="icon icon-ios"></i>IOS版下载</a>
        <a className={"android " + (isAndroid ? "on" : "")} onClick={() => AppDown('安卓扫码下载')} href={server.androidHref} download={"ipark.apk"}><i className="icon icon-anzhuo"></i>Android版下载</a>
        <a className={"pc " + ((!isAndroid && !isiOS) ? " on" : "")} onClick={() => setIsQrCode(true)} href="#"><i className="icon icon-erweima"></i>扫码下载</a>
        <div style={{ textAlign: "center" }} id="techSupport">{client.techSupport}</div>
      </div>
      <div className="showed" style={{ display: isWeiXin() ? "inline" : "none" }}></div>
      <div className="poper" style={{ display: isQrCode ? "inline" : "none" }}>
        <i className="icon icon-guanbi3" onClick={() => setIsQrCode(false)}></i>
        <img className="code" src={code} />
      </div>
      <img className="goto" src={goto} style={{ display: isWeiXin() ? "inline" : "none" }} />
      <WithContent visible={visible} setVisible={setVisible} />
    </div>
  )
}

export default Index
