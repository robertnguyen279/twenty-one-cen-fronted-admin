import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateCarousel from './CreateCarousel';
import EditCarousel from './EditCarousel';
import { RootState } from 'reducers/index.reducer';
import { getCarousels } from 'actions/carousel.action';
import { Carousel } from 'types';
import Button from 'components/Button';
import { Table, Skeleton, Space, Popconfirm, message } from 'antd';
import { convertDate } from 'services/common.service';
import axios from 'services/axios.service';

const CarouselPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [carouselList, setCarouselList] = React.useState([]);
  const carousels = useSelector((state: RootState) => state.carouselReducer.carousels);
  const getCarouselsError = useSelector((state: RootState) => state.carouselReducer.getCarouselsError);
  const [view, setView] = React.useState({ type: 'view', carouselId: null });

  const columns = [
    {
      title: 'Mô tải',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (date: Date) => convertDate(date),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a className="action_text" onClick={() => setView({ type: 'edit', carouselId: record._id })}>
            Sửa
          </a>
          <Popconfirm
            title="Bạn có chắc muốn xóa không?"
            onConfirm={() => handleDeleteCarousel(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <a className="action_text">Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDeleteCarousel = (id: string) => {
    axios
      .delete(`/carousel/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          message.success('Xóa hình ảnh thành công');
          dispatch(getCarousels());
        }
      })
      .catch(() => {
        message.error('Xóa hình ảnh thất bại');
      });
  };

  const renderView = (): React.ReactElement => {
    if (view.type === 'create') {
      return <CreateCarousel handleChangeView={() => setView({ type: 'view', carouselId: null })} />;
    } else if (view.type === 'view') {
      return (
        <div className="animate__animated animate__fadeInRight">
          <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Băng chuyền</div>
          <div className="flex justify-end pr-10">
            <Button className="text-sm" onClick={() => setView({ type: 'create', carouselId: null })}>
              Thêm hình ảnh
            </Button>
          </div>
          <div className="table p-10 w-full">
            {carouselList ? <Table columns={columns} dataSource={carouselList} /> : <Skeleton />}
          </div>
        </div>
      );
    } else {
      return (
        <EditCarousel
          handleChangeView={() => setView({ type: 'view', carouselId: null })}
          carouselId={view.carouselId}
        />
      );
    }
  };

  React.useEffect(() => {
    dispatch(getCarousels());
  }, []);

  React.useEffect(() => {
    if (carousels) {
      const carouselList = (Object.values(carousels) as Array<Carousel>).map((blog) => ({
        ...blog,
        key: blog._id,
      }));

      setCarouselList(carouselList);
    }
  }, [carousels]);

  React.useEffect(() => {
    if (getCarouselsError) {
      message.error('Lấy hình ảnh thất bại');
    }
  }, [getCarouselsError]);

  return renderView();
};

export default CarouselPage;
