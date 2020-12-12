import React, { useEffect, useState } from "react";
import { storage } from "../../firebase/firebase";
import { List, Card, Image } from "antd";
import { errorNotification } from "../Notifications/Notifications.utils";
import "./Gallery.scss";
import './../Notifications/Notifications.scss';


const serverErrorMessage = "Server error!";
const galleryErrorDescription = "There is something wrong when getting images!";

const Gallery = () => {
  const [listImg, setListImg] = useState([]);
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => {
    getImageFromStorage();
  }, []);

  const galleryImgList = (
    <List
      grid={{ gutter: 16, column: 8 }}
      dataSource={listImg}
      renderItem={(item) => (
        <List.Item>
            <Card title={item.imgName}>
                <Image src={item.url}/>
            </Card>
        </List.Item>
      )}
      loading={!loaded}
      pagination={{
        pageSize: '40',
        showQuickJumper: true,
        showSizeChanger: false,
      }}
    />
  );

  return <>{galleryImgList}</>;
};

export default Gallery;
