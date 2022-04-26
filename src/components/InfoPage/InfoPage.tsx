import { message } from 'antd';
import React from 'react';
import { Skeleton } from 'antd';
import axios from 'services/axios.service';
import { SiteInfo } from 'types';
import { convertInternationalPhone } from 'services/common.service';
import Button from 'components/Button';

const InfoPage = (): React.ReactElement => {
  const [siteInfo, setSiteInfo] = React.useState<SiteInfo>();

  const handleChangeInfoClick = () => {
    console.log('clicked');
  };

  React.useEffect(() => {
    axios
      .get('/site')
      .then((response) => {
        if (response.data.statusCode === 200) {
          setSiteInfo(response.data.siteInfo);
        }
      })
      .catch(() => {
        message.error('Lấy thôn tin liên hệ thất bại');
      });
  }, []);

  return (
    <div>
      <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Thông tin liên hệ</div>
      <div className="box_wrapper">
        {!siteInfo ? (
          <Skeleton />
        ) : (
          <React.Fragment>
            <div className="item my-3">
              <div className="title font-bold inline">Số điện thoại: </div>
              <div className="item_content inline">{convertInternationalPhone(siteInfo.phone.toString())}</div>
            </div>
            <div className="item my-3">
              <div className="title font-bold inline">Email: </div>
              <div className="item_content inline">{siteInfo.email}</div>
            </div>
            <div className="item my-3">
              <div className="title font-bold inline">Facebook: </div>
              <div className="item_content inline">{siteInfo.facebook}</div>
            </div>
            <div className="item my-3">
              <div className="title font-bold inline">Zalo: </div>
              <div className="item_content inline">{siteInfo.zalo}</div>
            </div>
          </React.Fragment>
        )}
      </div>
      <Button
        className="mt-5 relative left-1/2"
        style={{ transform: 'translateX(-50%)' }}
        onClick={handleChangeInfoClick}
      >
        Sửa thông tin
      </Button>
    </div>
  );
};

export default InfoPage;
