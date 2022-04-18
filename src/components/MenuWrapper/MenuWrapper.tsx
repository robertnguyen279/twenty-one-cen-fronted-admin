import React from 'react';
import StockIcon from 'assets/icons/stock-svgrepo-com.svg';
import UsersIcon from 'assets/icons/group-svgrepo-com.svg';
import ProductIcon from 'assets/icons/suit-svgrepo-com.svg';
import VoucherIcon from 'assets/icons/coupon-svgrepo-com.svg';
import BlogIcon from 'assets/icons/blog-svgrepo-com.svg';
import CarouselIcon from 'assets/icons/carousel-horizontal-svgrepo-com.svg';
import SiteInfoIcon from 'assets/icons/information-svgrepo-com.svg';
import SettingsIcon from 'assets/icons/setting-svgrepo-com.svg';
import OrderIcon from 'assets/icons/order-svgrepo-com.svg';
import { Link } from 'react-router-dom';

const MenuWrapper = (): React.ReactElement => {
  return (
    <div className="menu_wrapper mt-8 p-5 flex flex-wrap">
      <Link
        className={`item${
          window.location.pathname === '/dashboard' ? '--active' : ''
        } flex flex-col items-center justify-center cursor-pointer`}
        to="/dashboard"
      >
        <div className="icon">
          <img src={StockIcon} alt="stock" />
        </div>
        <div className="text pt-2">Thống kê</div>
      </Link>
      <Link
        className={`item${
          window.location.pathname === '/dashboard/users' ? '--active' : ''
        } flex flex-col items-center justify-center cursor-pointer`}
        to="/dashboard/users"
      >
        <div className="icon">
          <img src={UsersIcon} alt="users" />
        </div>
        <div className="text pt-2">Người dùng</div>
      </Link>
      <Link
        className={`item${
          window.location.pathname === '/dashboard/products' ? '--active' : ''
        } flex flex-col items-center justify-center cursor-pointer`}
        to="/dashboard/products"
      >
        <div className="icon">
          <img src={ProductIcon} alt="product" />
        </div>
        <div className="text pt-2">Sản phẩm</div>
      </Link>
      <Link
        className={`item${
          window.location.pathname === '/dashboard/orders' ? '--active' : ''
        } flex flex-col items-center justify-center cursor-pointer`}
        to="/dashboard/orders"
      >
        <div className="icon">
          <img src={OrderIcon} alt="order" />
        </div>
        <div className="text pt-2">Đơn hàng</div>
      </Link>
      <Link
        className={`item${
          window.location.pathname === '/dashboard/vouchers' ? '--active' : ''
        } flex flex-col items-center justify-center cursor-pointer`}
        to="/dashboard/vouchers"
      >
        <div className="icon">
          <img src={VoucherIcon} alt="voucher" />
        </div>
        <div className="text pt-2">Voucher</div>
      </Link>
      <Link
        className={`item${
          window.location.pathname === '/dashboard/blogs' ? '--active' : ''
        } flex flex-col items-center justify-center cursor-pointer`}
        to="/dashboard/blogs"
      >
        <div className="icon">
          <img src={BlogIcon} alt="blog" />
        </div>
        <div className="text pt-2">Blog</div>
      </Link>
      <Link
        className={`item${
          window.location.pathname === '/dashboard/carousels' ? '--active' : ''
        } flex flex-col items-center justify-center cursor-pointer`}
        to="/dashboard/carousels"
      >
        <div className="icon">
          <img src={CarouselIcon} alt="carousel" />
        </div>
        <div className="text pt-2">Băng chuyền</div>
      </Link>
      <Link
        className={`item${
          window.location.pathname === '/dashboard/info' ? '--active' : ''
        } flex flex-col items-center justify-center cursor-pointer`}
        to="/dashboard/info"
      >
        <div className="icon">
          <img src={SiteInfoIcon} alt="site-info" />
        </div>
        <div className="text pt-2">Liên hệ</div>
      </Link>
      <Link
        className={`item${
          window.location.pathname === '/dashboard/settings' ? '--active' : ''
        } flex flex-col items-center justify-center cursor-pointer`}
        to="/dashboard/settings"
      >
        <div className="icon">
          <img src={SettingsIcon} alt="settings" />
        </div>
        <div className="text pt-2">Cài đặt</div>
      </Link>
    </div>
  );
};

export default MenuWrapper;
