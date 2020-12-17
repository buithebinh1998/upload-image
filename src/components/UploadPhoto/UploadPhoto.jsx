import React, { useEffect, useState } from "react";
import { Upload, Modal, Button, Progress } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { storage, database } from "../../firebase/firebase";
import "./UploadPhoto.scss";
import onConfirmHandler from "../Modal/ConfirmModal";
import {
  successNotification,
  errorNotification,
} from "../Notifications/Notifications.utils";
import "./../Notifications/Notifications.scss";
import SelectFolder from "../SelectFolder/SelectFolder";

const generateUniqueID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const clearAllConfirm = "Do you want to clear all these photos?";
const clearAllContent = "Remember to upload your important photos.";

const uploadErrorMessage = "Upload failed!";
const uploadErrorDescription = "Cannot upload images, please try again!";

const uploadSuccessMessage = "Upload all images completed!";
const uploadSuccessDescription = "Please check in the Gallery!";

const UploadPhoto = () => {
  const [imageList, setImageList] = useState([]);
  const [totalImg, setTotalImg] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [percentUpload, setPercentUpload] = useState(0);
  const [uploaded, setUploaded] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [folderList, setFolderList] = useState([]);
  const [initFolderList, setInitFolderList] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [completeUpload, setCompleteUpload] = useState(false);
  const [initialLoad, setInitialLoaded] = useState(false);

  const getFolderList = () => {
    const folderRef = database.ref("folderName").orderByValue();
    folderRef.on("value", (snapshot) => {
      const newFolderList = [];
      snapshot.forEach((childSnapshot) => {
        if (!newFolderList.includes(childSnapshot.val())) {
          newFolderList.push(childSnapshot.val());
        }
      });
      setFolderList([...newFolderList]);
      setInitFolderList([...newFolderList]);
    });
  };

  useEffect(() => {
    setTotalImg(imageList.length);
  }, [imageList.length]);

  useEffect(() => {
    setInitialLoaded(true);
    getFolderList();
  }, []);

  const onClearAll = () => {
    setImageList([]);
  };

  useEffect(() => {
    if(initialLoad){
      const timeoutGetFolder = setTimeout(() => {
        getFolderList();
      }, 1000);
      return () => clearTimeout(timeoutGetFolder);
    }
  }, [completeUpload]);

  const handleUpload = () => {
    setPercentUpload(0);
    setUploaded(false);
    setSubmitting(true);
    let counter = 0;
    imageList.forEach((image) => {
      const originImage = image.originFileObj;
      originImage.id = generateUniqueID();
      const uploadTask = storage
        .ref(`${selectedFolder}/${originImage.id}_${originImage.name}`)
        .put(originImage);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          errorNotification(
            "error-notification",
            uploadErrorMessage,
            uploadErrorDescription
          );
          setUploaded(true);
          setSubmitting(false);
        },
        () => {
          if (!initFolderList.includes(selectedFolder)) {
            database.ref("folderName").orderByValue();
            database.ref("folderName").push(selectedFolder);
          }
          storage.ref(selectedFolder).child(originImage.name);
          counter++;
          setPercentUpload(Math.round((counter / imageList.length) * 100));
          if (counter === imageList.length) {
            setUploaded(true);
            successNotification(
              "success-notification",
              uploadSuccessMessage,
              uploadSuccessDescription
            );
            setCompleteUpload(true);
            setSubmitting(false);
            onClearAll();
          }
        }
      );

    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    setImageList(fileList);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="mt-2">Add images</div>
    </div>
  );

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div className="mr-3 font-weight-bold">Select an image folder:</div>
        <SelectFolder
          folderList={folderList}
          setFolderList={setFolderList}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          disabled={submitting}
        />
      </div>

      <div className="d-flex">
        <Button
          type="primary"
          danger
          className="mr-auto"
          disabled={totalImg <= 0 || !selectedFolder || submitting}
          onClick={() =>
            onConfirmHandler(
              clearAllConfirm,
              clearAllContent,
              onClearAll,
              () => {}
            )
          }
        >
          Clear All
        </Button>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={submitting || totalImg <= 0 || !selectedFolder}
          className="ml-auto"
        >
          Upload
        </Button>
      </div>
      <div className="mt-3 font-weight-bold">{`${totalImg} selected`}</div>
      <div className="d-flex justify-content-center flex-column">
        {!uploaded && <Progress type="line" percent={percentUpload} />}
      </div>
      <Upload
        accept="image/*"
        listType="picture-card"
        fileList={imageList}
        customRequest={dummyRequest}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={true}
        className={"mt-3"}
      >
        {uploadButton}
      </Upload>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadPhoto;
