import React, { useEffect, useState } from "react";
import { database, storage } from "../../firebase/firebase";
import { Table, Image, Space, Breadcrumb, Menu } from "antd";
import {
  errorNotification,
  successNotification,
} from "../Notifications/Notifications.utils";
import { DeleteOutlined, FolderOpenOutlined } from "@ant-design/icons";
import classes from "classnames";
import "./Gallery.scss";
import "./../Notifications/Notifications.scss";
import onConfirmHandler from "../Modal/ConfirmModal";

const serverErrorMessage = "Server error!";
const galleryErrorDescription = "There is something wrong when getting images!";

const deleteImgConfirm = "Do you wish to delete this image?";
const deleteImgContent = "The deleted images can not be reverted.";

const deleteSuccessMessage = "Delete the image successfully!";
const deleteSuccessContent = "Please check in the Gallery!";

const deleteErrorMessage = "Server error!";
const deleteErrorContent =
  "There is something wrong when deleting the image. Please try again!";

const Gallery = () => {
  const [listImg, setListImg] = useState([]);
  const [initialLoad, setInitialLoaded] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [folderList, setFolderList] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [completeDelete, setCompleteDelete] = useState(false);

  const getFolderList = (isInitialLoad) => {
    const folderRef = database.ref("folderName").orderByValue();
    folderRef.on("value", (snapshot) => {
      const newFolderList = [];
      snapshot.forEach((childSnapshot) => {
        if (!newFolderList.includes(childSnapshot.val())) {
          newFolderList.push(childSnapshot.val());
        }
      });
      setFolderList([...newFolderList]);
      isInitialLoad && setSelectedFolder(newFolderList[0]);
    });
  };

  useEffect(() => {
    if (!initialLoad) {
      const timeoutGetFolder = setTimeout(() => {
        getFolderList(false);
      }, 1000);
      return () => clearTimeout(timeoutGetFolder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completeDelete]);

  const getImageFromStorage = (selectedFolder) => {
    const imgListGet = [];
    const storageRef = storage.ref(selectedFolder);
    setLoaded(false);
    storageRef
      .listAll()
      .then((result) => {
        result.items.forEach(async (imageRef) => {
          let newUrl = "";
          let newName = "";
          let newImgName = "";
          let newUploadedDate = "";
          await imageRef
            .getDownloadURL()
            .then((url) => {
              newName = imageRef.name;
              newUrl = url;
            })
            .catch((error) => {
              errorNotification(
                "error-notification",
                serverErrorMessage,
                galleryErrorDescription
              );
            });
          await imageRef
            .getMetadata()
            .then((metadata) => {
              const { uploadedDate, imgName } = metadata.customMetadata;
              newImgName = imgName;
              newUploadedDate = uploadedDate;
            })
            .catch((error) => {
              errorNotification(
                "error-notification",
                serverErrorMessage,
                galleryErrorDescription
              );
            });
          imgListGet.push({
            name: newName,
            url: newUrl,
            imgName: newImgName,
            uploadedDate: newUploadedDate,
          });
          setListImg([...imgListGet]);
        });
      })
      .catch((error) => {
        errorNotification(
          "error-notification",
          serverErrorMessage,
          galleryErrorDescription
        );
      })
      .finally(() => {
        setLoaded(true);
      });
  };

  const onDelete = (name) => {
    onConfirmHandler(
      deleteImgConfirm,
      deleteImgContent,
      () => handleDeleteApi(name, selectedFolder),
      () => {}
    );
  };

  const handleDeleteApi = (name, selectedFolder) => {
    setSubmitting(true);
    const folderPath = selectedFolder;
    const deleteRef = storage.ref().child(`${folderPath}/${name}`);
    deleteRef
      .delete()
      .then(() => {
        successNotification(
          "success-notification",
          deleteSuccessMessage,
          deleteSuccessContent
        );
        setSubmitting(false);
        setCompleteDelete(true);
      })
      .catch((e) => {
        errorNotification(
          "error-notification",
          deleteErrorMessage,
          deleteErrorContent
        );
        setSubmitting(false);
      });
  };

  useEffect(() => {
    getImageFromStorage(selectedFolder);
    getFolderList(true);
    setInitialLoaded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      const timeoutGetStorage = setTimeout(() => {
        getImageFromStorage(selectedFolder);
      }, 1000);
      return () => clearTimeout(timeoutGetStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);

  useEffect(() => {
    if (!initialLoad) {
      getImageFromStorage(selectedFolder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolder]);

  const columns = [
    {
      title: "Name",
      dataIndex: "imgName",
      key: "imgName",
      render: (text, record) => (
        <div className="d-flex align-items-center name-group">
          <div className="item-img-wrapper">
            <Image className="item-img" src={record.url} alt={"error"} />
          </div>
          <div className="ml-2 item-img-text" title={text}>
            {text}
          </div>
        </div>
      ),
      sorter: {
        compare: (a, b) => a.imgName.localeCompare(b.imgName),
      },
    },
    {
      title: "Uploaded Date",
      key: "uploadedDate",
      dataIndex: "uploadedDate",
      render: (text) => <div>{text}</div>,
      sorter: {
        compare: (a, b) => a.uploadedDate.localeCompare(b.uploadedDate),
      },
      defaultSortOrder: "descend",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space
          size="middle"
          className={classes("delete-icon", isSubmitting && "disabled-delete")}
          onClick={isSubmitting ? () => {} : () => onDelete(record.name)}
        >
          <DeleteOutlined title={"Delete Image"} />
        </Space>
      ),
    },
  ];

  const folderListMapping = folderList.map((folder, index) => {
    return (
      <Menu.Item key={index} onClick={() => setSelectedFolder(folder)}>
        <div>
          <FolderOpenOutlined className="align-middle" /> {folder}
        </div>
      </Menu.Item>
    );
  });

  const menuFolder = <Menu>{folderListMapping}</Menu>;

  const breadcrumbFolder = (
    <Breadcrumb separator=">" className="mb-3">
      <Breadcrumb.Item>Gallery</Breadcrumb.Item>
      <Breadcrumb.Item overlay={menuFolder} className="font-weight-bold">
        <FolderOpenOutlined className="align-middle" /> {selectedFolder}
      </Breadcrumb.Item>
    </Breadcrumb>
  );

  const galleryImgList = (
    <Table
      columns={columns}
      pagination={{
        pageSize: "20",
        showQuickJumper: true,
        showSizeChanger: false,
      }}
      loading={!loaded}
      dataSource={listImg}
    />
  );

  return (
    <>
      {breadcrumbFolder}
      {galleryImgList}
    </>
  );
};

export default Gallery;
