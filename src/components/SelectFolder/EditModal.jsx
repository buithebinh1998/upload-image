import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { database } from "../../firebase/firebase";
import { errorNotification } from "../Notifications/Notifications.utils";

const EditModal = (props) => {
  const {
    isEditModalVisible,
    setIsEditModalVisible,
    editName,
    setEditName,
    setFetchFolderList,
  } = props;

  const editErrorMessage = "Edit folder name failed!";
  const editErrorDescription = "Cannot edit folder name, please try again!";
  const [initialName, setInitialName] = useState(editName);

  useEffect(() => {
    if (isEditModalVisible) setInitialName(editName);
  }, [isEditModalVisible]);

  const handleOk = async () => {
    // let updates = {};
    // let key = "";
    // const folderRef = database.ref("folderName").orderByValue();
    // await folderRef.on("value", (snapshot) => {
    //   snapshot.forEach((childSnapshot) => {
    //     if (childSnapshot.val() === initialName) {
    //       key = childSnapshot.key;
    //     }
    //   });
    // });
    // updates[key] = editName;
    // await database.ref("folderName/").update(updates);
    errorNotification(
      "error-notification",
      editErrorMessage,
      editErrorDescription
    );
    setIsEditModalVisible(false);
    setFetchFolderList(true);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
  };

  const onChangeEditName = (e) => {
    setEditName(e.target.value);
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
          value={editName}
          placeholder="Enter new folder name"
          onChange={onChangeEditName}
        />
      </Modal>
    </>
  );
};

export default EditModal;
