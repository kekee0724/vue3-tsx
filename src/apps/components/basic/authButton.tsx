// AuthBtn
import React from 'react';
import { Button } from 'antd-mobile';
import { useAppState } from '@/stores';

interface AuthButtonProps {
  hidden?: string; // 值为权限信息
  disabled?: string; // 值为权限信息
}

export const AuthButton: React.FC<AuthButtonProps> = props => {
  let { hidden, disabled, children } = props;
  const { perms } = useAppState(state => state.user);
  // 如果没有权限是否隐藏按钮
  if (hidden) {
    let hasAuth = perms.includes(hidden);
    return hasAuth ? <Button>{children}</Button> : null;
  }
  // 如果没有权限是否禁用按钮
  if (disabled) {
    let hasAuth = perms.includes(disabled);
    return hasAuth ? <Button disabled={hasAuth}>{children}</Button> : null;
  }
  return <>请传入权限信息</>;
};

export default AuthButton;
