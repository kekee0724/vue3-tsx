import React, {
  useEffect,
  useState,
} from 'react';

import { Button, Form, Grid, Input, Toast } from 'antd-mobile';
import $ from 'jquery';
import moment, { Moment } from 'moment';

import { getLocalStorage, setLocalStorage } from './utils';
import { WithPopup } from './with.popup';
// import { get } from '../../core/utils';

export interface MobileLoginState {
  /**
   * 倒计时
   */
  delay: number;
  /**
   * 是否计算过
   */
  isCaculate: boolean;
}

/**
 * 渲染手机登录
 */
export const MobileLogin = (props: any) => {
  const [state, setState] = useState<MobileLoginState>({ delay: 0, isCaculate: false });
  const [phone, setPhone] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [time, setTime] = useState<any>();
  const [exchangeUrl, setExchangeUrl] = useState(getLocalStorage("exchangeUrl"));

  const { delay, isCaculate } = state;

  useEffect(() => {
    setTime(setInterval(() => {
      setCookie();
    }, 1000))
    return () => {
      clearInterval(time)
    }
  }, []);

  // useEffect(() => {
  //   get('/index-infos').then((res) => {
  //     console.log(res)
  //   });
  // }, []);

  useEffect(() => {
    setDisabled(!isPoneAvailable())
  }, [phone])

  /**
   * 获取cookie
   * @returns
   */
  const getCookie = () => {
    // 获取全部的 cookie
    let cookie = $(document)[0].cookie;
    // 获取 cookie 项  (数组)
    let citem = cookie.split(";");
    // 过滤数组  获得 键为 ckey 的项
    let ckey = citem.filter((item) => {
      return item.split("=")[0].trim() == "ckey";
    });
    // 获得 时间  cval
    let cval = ckey.length > 0 && ckey[0].split("=")[1];
    return cval && moment(cval);
  }

  /**
   * 设置cookie
   * @param [times] 如果传了时间，表示重新开始倒计时，且取times为减数
   * @returns
   */
  const setCookie = (times?: Moment) => {
    if (times) {
      $(document)[0].cookie = "ckey=" + times.format();
      setState({ delay: 60, isCaculate: true });
      return;
    }
    // 当前时间
    const now = moment();
    // 发布时间
    const cval = getCookie();
    if (cval) {
      // 当前时间 - 发布时间 的秒数
      const diff = 60 - now.diff(cval, "seconds");
      if (diff >= 1 && diff < 60) {
        setState((state) => ({ ...state, delay: diff }));
      } else if ((diff < 1 && diff >= 0) || diff >= 60) {
        resetCookie();
      }
    } else {
      resetCookie();
    }
    setState((state) => ({ ...state, isCaculate: true }));
  }

  /**
   * 重置cookie
   */
  const resetCookie = () => {
    $(document)[0].cookie = "ckey=";
    setState((state) => ({ ...state, delay: 0 }));
    clearInterval(time);
  }

  /**
   * 开始倒计时
   * @returns start
   */
  const starts = (): void => {
    clearInterval(time);
    setCookie(moment());
    setTime(setInterval(() => {
      setCookie();
    }, 1000))
    return cancel();
  }

  /**
   * 取消
   */
  const cancel = (): void => {
    setState((state) => ({ ...state, delay: 0 }));
    clearInterval(time);
  }

  /**
   * 点击开始时
   * @returns
   */
  const onClickStart = () => {
    const { delay, isCaculate } = state;
    if (delay > 0 || !isCaculate) {
      return;
    }
    sendVerifyCode()
    starts()
  }

  // 正则：判断手机号码
  const isPoneAvailable = () => {
    const myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(phone)) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 验证码发送前校验 及 发送
   * @param delay 延迟时间方法
   */
  const sendVerifyCode = () => {
    const msg = isPoneAvailable;
    if (!msg) {
      Toast.show("请填写正确的手机号");
      return;
    }
    console.log("sendVerifyCode")
    $.ajax({
      url: server.url + server.auth.oauth2Url + '/authorize',
      type: 'GET',
      data: {
        client_id: server.apiKey.apiKey,
        client_secret: server.apiKey.secret,
        response_type: server.apiKey.responseType,
        username: phone,
      },
      success: function (res) {
        console.log(res)
      },
    });
  }

  const exchangeCode = (mobile: string, token: any) => {
    $.ajax({
      url:
        server.url +
        `app/abm-distribute/exchange-code/${mobile}/${client.productName}/${client.versionType}`,
      type: 'GET',
      headers: {
        Authorization: token,
      },
      success: function (exchangeCode) {
        setExchangeUrl(server.redeemUrl + `/?code=${exchangeCode}&ctx=apps`)
        setLocalStorage("exchangeUrl", server.redeemUrl + `/?code=${exchangeCode}&ctx=apps`)
        window.location.href = server.redeemUrl + `/?code=${exchangeCode}&ctx=apps`;
        // const w = window.open('about:blank') as any;
        // w.location.href = server.redeemUrl + `/?code=${exchangeCode}&ctx=apps`;
      },
    });
  }

  /**
   * 验证码登录
   */
  const mobileLogin = () => {
    setIsLogin(true)
    $.ajax({
      url: server.url + server.auth.oauth2Url + '/access_token',
      type: 'GET',
      data: {
        client_id: server.apiKey.apiKey,
        client_secret: server.apiKey.secret,
        // grant_type: 'client_credentials',
        grant_type: 'authorization_mobile',
        username: phone,
        code: authCode,
      },
      error: function (data, status, e) {
        Toast.show(data.responseJSON.errmsg);
        setIsLogin(false)
      },
      success: function (result) {
        Toast.show("登录成功");
        exchangeCode(phone, result.token_str);
        setIsLogin(false)
      },
    });
  }

  return (exchangeUrl ?
    <>
      <h2 className='login-title'>{"您已登录"}</h2>
      <Form.Item>
        <div className="blank22" />
        <Button
          color="primary"
          className="login-form-button"
          onClick={() => {
            window.location.href = exchangeUrl;
            // const w = window.open('about:blank') as any;
            // w.location.href = exchangeUrl;
          }}>
          立即兑换
        </Button>
      </Form.Item>
      <WithPopup />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>您已登录，点击立即兑换</p>
      </div>
    </>
    :
    <>
      <h2 className='login-title'>{"验证码登录"}</h2>
      <Form className="login-form mt30">
        <Form.Item>
          <Input
            value={phone}
            onChange={(e) => setPhone(e)}
            placeholder="请输入您的手机号"
            autoComplete="new-password" // 阻止浏览器在password类型的input中自动赋值
          />
        </Form.Item>
        <Form.Item>
          <Grid columns={12} gap={8}>
            <Grid.Item span={7}>
              <Input
                value={authCode}
                onChange={(e) => setAuthCode(e)}
                placeholder="请输入验证码"
                autoComplete="new-password" // 阻止浏览器在password类型的input中自动赋值
              />
            </Grid.Item>
            <Grid.Item span={5}>
              <Button disabled={disabled || !isCaculate} size="small" color="primary" onClick={() => onClickStart()}>
                {delay > 0 ? <span className="size-14 grayColor3">{delay} 秒</span> : <a>发送验证码</a>}
              </Button>
            </Grid.Item>
          </Grid>
        </Form.Item>
        <Form.Item>
          <div className="blank22" />
          <Button loading={isLogin} color="primary" className="login-form-button" onClick={() => mobileLogin()}>
            立即登录
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>登录后，将获得<em style={{ color: "red" }}>兑换码</em>地址</p>
        <span>填写的手机号仅用于获取应用兑换码</span>
      </div>
    </>

  );
}
