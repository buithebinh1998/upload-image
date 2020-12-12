import React from 'react';
import { notification } from "antd";
import { StopOutlined, CheckCircleOutlined } from '@ant-design/icons';

export const errorNotification = (className, message, description) => {
    notification.open({
        className: className,
        message: message,
        description: description,
        icon: <StopOutlined />,
        duration: 3,
    });
};

export const successNotification = (className, message, description) => {
    notification.open({
        className: className,
        message: message,
        description: description,
        icon: <CheckCircleOutlined />,
        duration: 6,
    });
};