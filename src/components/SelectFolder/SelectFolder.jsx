import React from 'react';
import { Select, Divider, Input } from "antd";
import { PlusOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { useState } from "react";
import './SelectFolder.scss';

const { Option } = Select;

const SelectFolder = (props) => {
  const { folderList, setFolderList, selectedFolder, setSelectedFolder, disabled, initialLoad } = props;

  const [name, setName] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = () => {
    if(!name || name === '') return;
    setFolderList([...folderList, name]);
    setName('');
  };

  return (
    <>
    <Select
      disabled={disabled}
      style={{ width: 240 }}
      onChange={(value) => {
          setSelectedFolder(value)
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
              <PlusOutlined className="mr-1"/> Add folder
            </div>
          </div>
        </div>
      )}
    >
      {folderList.map((item) => (
        <Option key={item}>
            <FolderOpenOutlined className="mr-1"/>{item}
        </Option>
      ))}
    </Select>
    {!selectedFolder && <div className="error-text ml-3">Please choose a folder first</div>}
    </>
  );
};

export default SelectFolder;
