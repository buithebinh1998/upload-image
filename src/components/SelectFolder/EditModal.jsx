import React from "react";
import { Modal, Input } from "antd";
import { database } from "../../firebase/firebase";
import { errorNotification } from "../Notifications/Notifications.utils";

const EditModal = (props) => {
  const {
    isEditModalVisible,
    setIsEditModalVisible,
    editFolder,
    setEditFolder,
    setFetchFolderList,
  } = props;

  const editErrorMessage = "Edit folder name failed!";
  const editErrorDescription = "Cannot edit folder name, please try again!";

  const handleOk = async () => {
    try {
      database.ref("folderName").orderByValue();
      await database.ref("folderName/" + editFolder.id).set({
        name: editFolder.name,
        id: editFolder.id,
      });
      setIsEditModalVisible(false);
      setFetchFolderList(true);
    } catch (e) {
      errorNotification(
        "error-notification",
        editErrorMessage,
        editErrorDescription
      );
    }
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
  };

  const onChangeEditName = (e) => {
    setEditFolder({ ...editFolder, name: e.target.value });
  };

  return (
    <>
      <Modal
        title="Edit folder name"
        visible={isEditModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={editFolder.name}
          placeholder="Enter new folder name"
          onChange={onChangeEditName}
        />
      </Modal>
    </>
  );
};

export default EditModal;
