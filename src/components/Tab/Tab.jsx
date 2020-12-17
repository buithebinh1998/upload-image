import React, {useState} from 'react';
import { Card } from 'antd';
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import onConfirmHandler from "../Modal/ConfirmModal";
import Gallery from "../Gallery/Gallery";
import { Link } from 'react-router-dom';

const tabList = [
    {
        key: 'upload_photos',
        tab: 'Upload Photos',
    },
    {
        key: 'gallery',
        tab: 'Gallery',
    },
];

const contentList = {
    upload_photos: <UploadPhoto/>,
    gallery: <Gallery/>,
};

const tabChangeConfirm = 'Are you sure to go to Gallery?';
const tabChangeContent = 'Upload all your photos or else they will be losted.';

const TabsCard = (props) => {
    const [selectedTab, setSelectedTab] = useState(props.activeTabKey);

    const onTabChange = (key, type) => {
        if (key !== 'upload_photos' && selectedTab.key !== 'gallery' ) {
            onConfirmHandler(tabChangeConfirm, tabChangeContent, () => setSelectedTab({ [type]: key }), () => {} );
            return;
        }
        setSelectedTab({ [type]: key });
    };

    return (
        <>
            <Card
                className={'m-3'}
                title="Photos Management"
                extra={<Link to="/">Back to homepage</Link>}
                tabList={tabList}
                activeTabKey={selectedTab.key}
                onTabChange={(key) => onTabChange(key, 'key')}
            >
                {contentList[selectedTab.key]}
            </Card>
        </>
    );
}

export default TabsCard;