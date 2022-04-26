import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers/index.reducer';
import { getVouchers } from 'actions/voucher.action';
import { checkExpiredVoucher, convertDate } from 'services/common.service';
import { message, Space, Tag, Popconfirm, Table, Skeleton } from 'antd';
import { Voucher } from 'types';
import Button from 'components/Button';
import CreateVoucher from './CreateVoucher';
import axios from 'services/axios.service';
import EditVoucher from './EditVoucher';

const VoucherPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [voucherList, setVoucherList] = React.useState([]);
  const vouchers = useSelector((state: RootState) => state.voucherReducer.vouchers);
  const getVouchersError = useSelector((state: RootState) => state.voucherReducer.getVouchersError);
  const [view, setView] = React.useState({
    type: 'view',
    voucherId: null,
  });

  const columns = [
    {
      title: 'Mô tả',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Giảm giá (%)',
      key: 'discount',
      dataIndex: 'discount',
    },
    {
      title: 'Phân loại',
      key: 'address',
      dataIndex: 'category',
      render: (category) => {
        if (category) {
          return category.name;
        } else {
          return 'Tất cả mặt hàng';
        }
      },
    },
    {
      title: 'Public',
      dataIndex: 'public',
      key: 'public',
      render: (isPublic: boolean) => {
        if (isPublic) {
          return <Tag color="blue">PUBLIC</Tag>;
        } else {
          return <Tag color="green">PRIVATE</Tag>;
        }
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (text, record) => {
        const status = checkExpiredVoucher(record.expiresIn);
        if (status === 'Hết hạn') {
          return <Tag color="red">{status}</Tag>;
        } else {
          return <Tag color="green">{status}</Tag>;
        }
      },
    },
    {
      title: 'Ngày hết hạn',
      key: 'expiresIn',
      dataIndex: 'expiresIn',
      render: (date: Date) => convertDate(date),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a className="action_text" onClick={() => setView({ type: 'edit', voucherId: record._id })}>
            Sửa
          </a>
          <Popconfirm
            title="Bạn có chắc muốn xóa không?"
            onConfirm={() => handleDeleteVoucher(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <a className="action_text">Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDeleteVoucher = (id: string) => {
    axios
      .delete(`/voucher/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          message.success('Xóa voucher thành công');
          dispatch(getVouchers());
        }
      })
      .catch(() => {
        message.error('Xóa voucher thất bại');
      });
  };

  const handleCreateVoucherClick = () => {
    setView({
      type: 'create',
      voucherId: null,
    });
  };

  React.useEffect(() => {
    dispatch(getVouchers());
  }, []);

  React.useEffect(() => {
    if (getVouchersError) {
      message.error('Lấy vouchers thất bại');
    }
  }, [getVouchersError]);

  React.useEffect(() => {
    if (vouchers) {
      const voucherList = (Object.values(vouchers) as Array<Voucher>).map((voucher) => ({
        ...voucher,
        key: voucher._id,
      }));
      setVoucherList(voucherList);
    }
  }, [vouchers]);

  const renderView = (): React.ReactElement => {
    if (view.type === 'view') {
      return (
        <div className="animate__animated animate__fadeInRight">
          <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Voucher</div>
          <div className="flex justify-end pr-10">
            <Button className="text-sm" onClick={handleCreateVoucherClick}>
              Thêm voucher
            </Button>
          </div>
          <div className="table p-10 w-full">
            {voucherList ? <Table columns={columns} dataSource={voucherList} /> : <Skeleton />}
          </div>
        </div>
      );
    } else if (view.type === 'create') {
      return <CreateVoucher handleChangeView={() => setView({ type: 'view', voucherId: null })} />;
    } else {
      return (
        <EditVoucher handleChangeView={() => setView({ type: 'view', voucherId: null })} voucherId={view.voucherId} />
      );
    }
  };

  return renderView();
};

export default VoucherPage;
