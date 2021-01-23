import React, { useState } from "react";
import { Card } from "antd";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import onConfirmHandler from "../Modal/ConfirmModal";
import Gallery from "../Gallery/Gallery";

const tabList = [
  {
    key: "upload_images",
    tab: "Upload Images",
  },
  {
    key: "gallery",
    tab: "Gallery",
  },
];

const contentList = {
  upload_images: <UploadPhoto />,
  gallery: <Gallery />,
};

const tabChangeConfirm = "Are you sure to go to Gallery?";
const tabChangeContent = "Upload all your images or else they will be lost.";

const TabsCard = (props) => {
  const [selectedTab, setSelectedTab] = useState(props.activeTabKey);

  const onTabChange = (key, type) => {
    if (key !== "upload_images" && selectedTab.key !== "gallery") {
      onConfirmHandler(
        tabChangeConfirm,
        tabChangeContent,
        () => setSelectedTab({ [type]: key }),
        () => {}
      );
      return;
    }
    setSelectedTab({ [type]: key });
  };

  return (
    <>
      <Card
        className={"m-3"}
        title="Images Management"
        tabList={tabList}
        activeTabKey={selectedTab.key}
        onTabChange={(key) => onTabChange(key, "key")}
      >
        {contentList[selectedTab.key]}
      </Card>
    </>
  );
};

export default TabsCard;
