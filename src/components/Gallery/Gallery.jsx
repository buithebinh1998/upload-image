import React, {useEffect, useMemo, useState} from 'react';
import { storage } from "../../firebase/firebase";
import { notification, List, Card, Image} from "antd";
import { StopOutlined } from '@ant-design/icons';

import './Gallery.scss';

export const errorNotification = (message, description) => {
    notification.open({
        className: 'error-notification',
        message: 'Server error!',
        description:
            'Gallery cannot get any images, please reload the page!',
        icon: <StopOutlined/>,
        duration: null,
    });
};

const serverErrorMessage = 'Server error!';
const galleryErrorDescription = 'There is something wrong when getting images!';

const Gallery = () => {
    const [listImg, setListImg] = useState([]);

    const imgListGet = [];

    const getImageFromStorage = () => {
        const storageRef = storage.ref("images");

        storageRef.listAll().then((result) => {
            result.items.forEach((imageRef) => {
                const imgName = imageRef.name;
                imageRef.getDownloadURL().then((url) => {
                    imgListGet.push({imgName, url});
                    setListImg(imgListGet);
                }).catch((error) => {
                    errorNotification(serverErrorMessage, galleryErrorDescription);
                });
            });
        }).catch((error) => {
            errorNotification(serverErrorMessage, galleryErrorDescription);
        });
    }

    useEffect(() => {
        getImageFromStorage();
    }, []);

    const galleryImgList = listImg.map((img, index) => {
        return (
            <div key={index}>{img.imgName}</div>
        )
    });

    return(
        <>
            {galleryImgList}
        </>
    )
}

export default Gallery;