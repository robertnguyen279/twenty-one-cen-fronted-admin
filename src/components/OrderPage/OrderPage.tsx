import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers/index.reducer';
import { getOrders } from 'actions/order.action';
import { message, Skeleton, Tag, Table, Space, Popconfirm } from 'antd';
import { currencyFormatter, convertDate, convertInternationalPhone } from 'services/common.service';
import { Order } from 'types';
import UpdateOrder from './UpdateOrder';
import axios from 'services/axios.service';

const OrderPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orderReducer.orders);
  const getOrdersError = useSelector((state: RootState) => state.orderReducer.getOrdersError);
  const [orderList, setOrderList] = React.useState([]);

  const [view, setView] = React.useState({
    type: 'view',
    orderId: null,
  });

  const columns = [
    {
      title: 'Họ và tên',
      key: 'name',
      render: (text, record) => {
        return record.contactDetail.lastName + ' ' + record.contactDetail.firstName;
      },
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      render: (text, record) => convertInternationalPhone(record.contactDetail.phone.toString()),
    },
    {
      title: 'Địa chỉ nhận hàng',
      key: 'address',
      render: (text, record) => {
        const province = record.contactDetail.province || '';
        const district = record.contactDetail.district || '';
        const addressDetail = record.contactDetail.addressDetail || '';
        return `${addressDetail} ${district} ${province}`;
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => currencyFormatter.format(price),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'placed') {
          return <Tag color="yellow">ĐANG CHỜ</Tag>;
        } else if (status === 'approved') {
          return <Tag color="blue">ĐANG GIAO</Tag>;
        } else {
          return <Tag color="green">ĐÃ GIAO</Tag>;
        }
      },
    },
    {
      title: 'Ngày đặt hàng',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (date: Date) => convertDate(date),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a className="action_text" onClick={() => setView({ type: 'edit', orderId: record._id })}>
            Câp nhật
          </a>
          <Popconfirm
            title="Bạn có chắc muốn xóa không?"
            onConfirm={() => handleDeleteOrder(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <a className="action_text">Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDeleteOrder = (id: string) => {
    axios
      .delete(`/order/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          console.log(response);
          message.success('Xóa sản phẩm thành công');
          dispatch(getOrders());
        }
      })
      .catch((error) => {
        message.error(error.reponse.data.message);
      });
  };

  const handleChangeView = () => {
    setView({ type: 'view', orderId: null });
  };

  React.useEffect(() => {
    dispatch(getOrders());
  }, []);

  React.useEffect(() => {
    if (getOrdersError) {
      message.error('Lấy danh sách đơn hàng thất bại');
    }
  }, [getOrdersError]);

  React.useEffect(() => {
    if (orders) {
      const orderList = (Object.values(orders) as Array<Order>).map((order) => ({
        ...order,
        key: order._id,
      }));

      setOrderList(orderList);
    }
  }, [orders]);

  const renderView = (): React.ReactElement => {
    if (view.type === 'view') {
      return (
        <div className="animate__animated animate__fadeInRight">
          <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Đơn hàng</div>
          <div className="table p-10 w-full">
            {orderList ? <Table columns={columns} dataSource={orderList} /> : <Skeleton />}
          </div>
        </div>
      );
    } else {
      return <UpdateOrder handleChangeView={handleChangeView} orderId={view.orderId} />;
    }
  };

  return renderView();
};

export default OrderPage;
