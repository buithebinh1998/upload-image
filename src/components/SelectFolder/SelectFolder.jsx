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

const { Option } = Select;

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
  const [editName, setEditName] = useState("");
  const deleteFolderConfirm = "Do you wish to delete this folder?";
  const deleteFolderContent = "The deleted folder can not be reverted.";

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = () => {
    if (!name || name === "") return;
    if (!folderList.includes(name)) {
      database.ref("folderName").orderByValue();
      database.ref("folderName").push(name);
      setFolderList([...folderList, name]);
    }
    setName("");
  };

  const editItem = (name) => {
    setEditName(name);
    setIsEditModalVisible(true);
  };

  const deleteItem = (name) => {
    onConfirmHandler(
      deleteFolderConfirm,
      deleteFolderContent,
      async () => {
        let key = "";
        const folderRef = database.ref("folderName").orderByValue();
        await folderRef.on("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val() === name) {
              key = childSnapshot.key;
            }
          });
        });
        await database.ref("folderName/").remove(key);
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
          <Option key={item}>
            <FolderOpenOutlined className="mr-1" />
            <span className="folder-name-text" title={item}>
              {item}
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
        editName={editName}
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        setEditName={setEditName}
        setFetchFolderList={setFetchFolderList}
      />
    </>
  );
};

export default SelectFolder;
