import React from "react";
import { Select, Divider, Input } from "antd";
import {
  PlusOutlined,
  FolderOpenOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "./SelectFolder.scss";
import { database } from "../../firebase/firebase";
import EditModal from "./EditModal";
import onConfirmHandler from "../Modal/ConfirmModal";
import { generateUniqueID } from "../UploadPhoto/UploadPhoto";
import { errorNotification } from "../Notifications/Notifications.utils";

const { Option } = Select;

const deleteErrorMessage = "Server error!";
const deleteErrorContent =
  "There is something wrong when deleting the folder. Please try again!";

const SelectFolder = (props) => {
  const {
    folderList,
    setFolderList,
    selectedFolder,
    setSelectedFolder,
    disabled,
    setFetchFolderList,
  } = props;

  const [name, setName] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editFolder, setEditFolder] = useState({});
  const deleteFolderConfirm = "Do you wish to delete this folder?";
  const deleteFolderContent = "The deleted folder can not be reverted.";

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = () => {
    if (!name || name === "") return;
    if (!folderList.includes(name)) {
      const id = generateUniqueID();
      database.ref("folderName").orderByValue();
      database.ref("folderName/" + id).set({
        name,
        id,
      });
      setFolderList([...folderList, { id, name }]);
    }
    setName("");
  };

  const editItem = (item) => {
    setEditFolder(item);
    setIsEditModalVisible(true);
  };

  const deleteItem = (item) => {
    onConfirmHandler(
      deleteFolderConfirm,
      deleteFolderContent,
      () => {
        const folderRef = database.ref("folderName/" + item.id);
        folderRef
          .remove()
          .then(() => {
            console.log("Remove succeeded.");
          })
          .catch((e) => {
            errorNotification(
              "error-notification",
              deleteErrorMessage,
              deleteErrorContent
            );
          });
      },
      () => {}
    );
  };

  return (
    <>
      <Select
        disabled={disabled}
        style={{ width: 240 }}
        onChange={(value) => {
          setSelectedFolder(value);
        }}
        value={selectedFolder.name}
        placeholder="Folder Name"
        dropdownRender={(menu) => (
          <div>
            {menu}
            <Divider className="mx-2 my-0" />
            <div className="d-flex flex-nowrap p-2">
              <Input
                className="d-flex flex-auto"
                value={name}
                onChange={onNameChange}
              />
              <div
                className="d-flex align-items-center p-2 add-folder"
                onClick={() => addItem()}
              >
                <PlusOutlined className="mr-1" /> Add folder
              </div>
            </div>
          </div>
        )}
      >
        {folderList.map((item) => (
          <Option key={item.id}>
            <FolderOpenOutlined className="mr-1" />
            <span className="folder-name-text" title={item.name}>
              {item.name}
            </span>
            <span className="ml-auto d-flex">
              <EditOutlined
                className="edit-folder mr-3"
                title="Edit"
                onClick={() => editItem(item)}
              />
              <DeleteOutlined
                className="delete-folder"
                title="Delete"
                onClick={() => deleteItem(item)}
              />
            </span>
          </Option>
        ))}
      </Select>
      {!selectedFolder && (
        <div className="error-text ml-3">Please choose a folder first</div>
      )}
      <EditModal
        editFolder={editFolder}
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        setEditFolder={setEditFolder}
        setFetchFolderList={setFetchFolderList}
      />
    </>
  );
};

export default SelectFolder;
