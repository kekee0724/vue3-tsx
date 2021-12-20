import { FC } from 'react';
import { Button } from 'antd-mobile';

export type ButtonProps = typeof Button;

export interface NewButtonProps extends ButtonProps { }

const NewButton: NewButtonProps = props => {
  return <Button {...props} />;
};

const MyButton = Object.assign(Button, NewButton);

export default MyButton;
