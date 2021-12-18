import React, { useState } from 'react';
import { Modal, Button } from 'antd';

export const UserModal = ({ visible, onOk, onCancel }: any) => {
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
