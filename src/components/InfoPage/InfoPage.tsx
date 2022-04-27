import { message } from 'antd';
import React from 'react';
import { Skeleton } from 'antd';
import axios from 'services/axios.service';
import { SiteInfo } from 'types';
import { convertInternationalPhone } from 'services/common.service';
import Button from 'components/Button';
import EditInfo from './EditInfo';

const InfoPage = (): React.ReactElement => {
  const [siteInfo, setSiteInfo] = React.useState<SiteInfo>();
  const [view, setView] = React.useState({ type: 'view', createdAt: new Date() });

  const handleChangeInfoClick = () => {
    setView({ type: 'create', createdAt: new Date() });
  };

  const renderView = () => {
    if (view.type === 'view') {
      return (
        <div className="animate__animated animate__fadeInRight">
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
                  <div className="item_content inline">{convertInternationalPhone(siteInfo.zalo.toString())}</div>
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
    } else {
      return <EditInfo handleChangeView={() => setView({ type: 'view', createdAt: new Date() })} info={siteInfo} />;
    }
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
  }, [view]);

  return renderView();
};

export default InfoPage;
