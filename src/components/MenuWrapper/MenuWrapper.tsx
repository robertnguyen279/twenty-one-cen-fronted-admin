import React from 'react';
import StockIcon from 'assets/icons/stock-svgrepo-com.svg';
import UsersIcon from 'assets/icons/group-svgrepo-com.svg';
import ProductIcon from 'assets/icons/suit-svgrepo-com.svg';
import VoucherIcon from 'assets/icons/coupon-svgrepo-com.svg';
import BlogIcon from 'assets/icons/blog-svgrepo-com.svg';
import CarouselIcon from 'assets/icons/carousel-horizontal-svgrepo-com.svg';
import SiteInfoIcon from 'assets/icons/information-svgrepo-com.svg';
import SettingsIcon from 'assets/icons/setting-svgrepo-com.svg';

const MenuWrapper = (): React.ReactElement => {
  console.log(window.location.pathname);
  return (
    <div className="menu_wrapper mt-8 p-5 flex flex-wrap">
      <div
        className={`item${
          window.location.pathname === '/dashboard' ? '--active' : ''
        } flex flex-col items-center justify-center cursor-pointer`}
      >
        <div className="icon">
          <img src={StockIcon} alt="stock" />
        </div>
        <div className="text pt-2">Thống kê</div>
      </div>
      <div className="item flex flex-col items-center justify-center cursor-pointer">
        <div className="icon">
          <img src={UsersIcon} alt="users" />
        </div>
        <div className="text pt-2">Người dùng</div>
      </div>
      <div className="item flex flex-col items-center justify-center cursor-pointer">
        <div className="icon">
          <img src={ProductIcon} alt="product" />
        </div>
        <div className="text pt-2">Sản phẩm</div>
      </div>
      <div className="item flex flex-col items-center justify-center cursor-pointer">
        <div className="icon">
          <img src={VoucherIcon} alt="voucher" />
        </div>
        <div className="text pt-2">Voucher</div>
      </div>
      <div className="item flex flex-col items-center justify-center cursor-pointer">
        <div className="icon">
          <img src={BlogIcon} alt="blog" />
        </div>
        <div className="text pt-2">Blog</div>
      </div>
      <div className="item flex flex-col items-center justify-center cursor-pointer">
        <div className="icon">
          <img src={CarouselIcon} alt="carousel" />
        </div>
        <div className="text pt-2">Băng chuyền</div>
      </div>
      <div className="item flex flex-col items-center justify-center cursor-pointer">
        <div className="icon">
          <img src={SiteInfoIcon} alt="site-info" />
        </div>
        <div className="text pt-2">Liên hệ</div>
      </div>
      <div className="item flex flex-col items-center justify-center cursor-pointer">
        <div className="icon">
          <img src={SettingsIcon} alt="settings" />
        </div>
        <div className="text pt-2">Cài đặt</div>
      </div>
    </div>
  );
};

export default MenuWrapper;
