import React, { useEffect, useState } from "react";
import { storage } from "../../firebase/firebase";
import { Table, Image, Space } from "antd";
import { errorNotification, successNotification } from "../Notifications/Notifications.utils";
import { DeleteOutlined } from "@ant-design/icons";
import classes from 'classnames';
import "./Gallery.scss";
import './../Notifications/Notifications.scss';
import onConfirmHandler from "../Modal/ConfirmModal";


const serverErrorMessage = "Server error!";
const galleryErrorDescription = "There is something wrong when getting images!";

const deleteImgConfirm = 'Do you wish to delete this image?';
const deleteImgContent = 'The deleted images can not be reverted.';

const deleteSuccessMessage = 'Delete the image successfully!';
const deleteSuccessContent = 'Please check in the Gallery!';

const deleteErrorMessage = 'Server error!';
const deleteErrorContent = 'There is something wrong when deleting the image. Please try again!';

const Gallery = () => {
  const [listImg, setListImg] = useState([]);
  const [initialLoad, setInitialLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const getImageFromStorage = () => {
    const imgListGet = [];
    const storageRef = storage.ref("images");
    storageRef
      .listAll()
      .then((result) => {
        result.items.forEach((imageRef) => {
          imageRef
            .getDownloadURL()
            .then((url) => {
              const imgName = imageRef.name;
              imgListGet.push({ imgName, url });
              setListImg([...imgListGet]);
            })
            .catch((error) => {
              errorNotification('error-notification', serverErrorMessage, galleryErrorDescription);
            });
        });
      })
      .catch((error) => {
        errorNotification('error-notification', serverErrorMessage, galleryErrorDescription);
      }).finally(() => {
        setLoaded(true);
      });
  };

  const onDelete = (imgName) => {
    onConfirmHandler(deleteImgConfirm, deleteImgContent, () => handleDeleteApi(imgName), () => {} );
  };

  const handleDeleteApi = (imgName) => {
    setSubmitting(true);
    const folderPath = 'images/';
    const deleteRef = storage.ref().child(`${folderPath}/${imgName}`);
    deleteRef.delete().then(() => {
      successNotification('success-notification', deleteSuccessMessage, deleteSuccessContent);
      setSubmitting(false);
    }).catch((e) => {
      errorNotification('error-notification', deleteErrorMessage, deleteErrorContent);
      setSubmitting(false);
    });
  }

  useEffect(() => {
    getImageFromStorage();
    setInitialLoaded(true);
  }, []);

  useEffect(() => {
    if(initialLoad){
      const timeoutGetStorage = setTimeout(() => {
        getImageFromStorage();
      }, 1000);
      return () => clearTimeout(timeoutGetStorage);
    }
  }, [isSubmitting]);

  const columns = [
  {
    title: 'Name',
    dataIndex: 'imgName',
    key: 'imgName',
    render: (text, record) => (
      <div className="d-flex align-items-center">
        <div className="item-img-wrapper">
          <Image className="item-img" src={record.url} alt={text}/>
        </div>
        <div className="ml-2">{text}</div>
      </div>
    ),
  },
  {
    title: 'Uploaded Date',
    key: 'uploadedDate',
    dataIndex: 'uploadedDate',
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <Space size="middle" className={classes("delete-icon", isSubmitting && "disabled-delete")} onClick={isSubmitting ? () => {} : () => onDelete(record.imgName)}>
        <DeleteOutlined/>
      </Space>
    ),
  },
];

  const galleryImgList = (
    <Table
      columns={columns}
      pagination={{
        pageSize: '20',
        showQuickJumper: true,
        showSizeChanger: false,
      }}
      dataSource={listImg}
    />
  );

  return <>{galleryImgList}</>;
};

export default Gallery;
