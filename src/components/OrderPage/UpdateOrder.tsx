import React from 'react';
import { IUpdateOrder } from 'types';
import axios from 'services/axios.service';
import { message, Skeleton, Select } from 'antd';
import { Order } from 'types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { getOrders } from 'actions/order.action';
import CancelButton from 'components/CancelButton';
import {
  convertDate,
  convertInternationalPhone,
  currencyFormatter,
  checkExpiredVoucher,
} from 'services/common.service';

const { Option } = Select;

const UpdateOrder = ({ handleChangeView, orderId }: IUpdateOrder): React.ReactElement => {
  const [order, setOrder] = React.useState<Order>();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      status: '',
    },
    validationSchema: Yup.object().shape({
      status: Yup.string().required('Bạn phải nhập mục này'),
    }),
    onSubmit: ({ status }) => {
      axios
        .patch(`/order/${orderId}`, { status })
        .then((response) => {
          if (response.data.statusCode === 200) {
            message.success('Cập nhật đơn hàng thành công');
          }
          dispatch(getOrders());
          handleChangeView();
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    },
  });
  const handleSelectChange = (value: string): void => {
    formik.values.status = value;
  };

  React.useEffect(() => {
    axios
      .get(`/order/${orderId}`)
      .then((response) => {
        formik.values.status = response.data.order.status;
        setOrder(response.data.order);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  }, []);
  return (
    <div className="update_order animate__animated animate__fadeInRight">
      <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Cập nhật đơn hàng</div>
      {!order ? (
        <Skeleton />
      ) : (
        <form className="form p-5" onSubmit={formik.handleSubmit}>
          <div className="form_item py-3">
            <div className="form_title font-bold inline">Tên: </div>
            <div className="form_content inline">
              {order.contactDetail.lastName} {order.contactDetail.firstName}
            </div>
          </div>
          <div className="form_item py-3">
            <div className="form_title font-bold inline">Địa chỉ: </div>
            <div className="form_content inline">
              {order.contactDetail.addressDetail} {order.contactDetail.district} {order.contactDetail.province}
            </div>
          </div>
          <div className="form_item py-3">
            <div className="form_title font-bold inline">Số điện thoại: </div>
            <div className="form_content inline">{convertInternationalPhone(order.contactDetail.phone.toString())}</div>
          </div>
          <div className="form_item py-3">
            <div className="form_title font-bold inline">Ngày đặt: </div>
            <div className="form_content inline">{convertDate(order.createdAt)}</div>
          </div>
          <div className="form_item py-3">
            <div className="form_title font-bold inline">Ghi chú: </div>
            <div className="form_content inline">{order.description}</div>
          </div>
          <div className="form_item py-3">
            <div className="form_title font-bold inline">Sản phẩm: </div>
            {order.products.map((product, i) => (
              <div className="ml-3 flex items-center my-3" key={i}>
                <div className="form_product_img px-3">
                  <img src={product.productId.pictures[0]} alt="product-img" />
                </div>
                <div className="form_product_text italic">
                  {product.productId.name} - số lượng ({product.quantity}) - giá (
                  {currencyFormatter.format(product.productId.price)})
                </div>
              </div>
            ))}
          </div>
          <div className="form_item py-3">
            <div className="form_title font-bold inline">Giá gốc: </div>
            <div className="form_content inline italic">{currencyFormatter.format(order.originalPrice)}</div>
          </div>
          <div className="form_item py-3">
            <div className="form_title font-bold inline">Giá đã giảm: </div>
            <div className="form_content inline italic">{currencyFormatter.format(order.totalPrice)}</div>
          </div>
          <div className="form_item py-3">
            <div className="form_title font-bold inline">Voucher: </div>
            {order.vouchers.map((voucher, i): React.ReactElement | void => {
              if (voucher) {
                return (
                  <div className="form_content ml-3 italic" key={i}>
                    {voucher.code} - {voucher.description} - {checkExpiredVoucher(voucher.expiresIn)}
                  </div>
                );
              }
            })}
          </div>
          <div className="form_title pt-5 text-sm pb-2 text-left font-normal pl-2">Trạng thái</div>
          <Select defaultValue={formik.values.status} style={{ width: 120 }} onChange={handleSelectChange}>
            <Option value="placed">Đang chờ</Option>
            <Option value="approved">Đang giao</Option>
            <Option value="done">Đã giao</Option>
          </Select>
          <div className="submit_buttons pt-5 flex justify-center items-center">
            <CancelButton onClick={handleChangeView} className="mx-2">
              Hủy
            </CancelButton>
            <Button type="submit" className="mx-2">
              Cập nhật
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateOrder;
