import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const onConfirmHandler = (title, content, onOkHandler, onCancelHandler) => {
    confirm({
        title: title,
        icon: <ExclamationCircleOutlined />,
        content: content,
        onOk() {
            onOkHandler()
        },
        onCancel() {
            onCancelHandler()
        },
    });
}

export default onConfirmHandler;