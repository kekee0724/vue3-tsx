import React, { useState } from 'react';
import { Form, Input, Modal, Button } from 'antd';

export const UserModal = ({ visible, record, onOk, onCancel }: any) => {
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        {JSON.stringify(record)}
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
