import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateBlog from './CreateBlog';
import EditBlog from './EditBlog';
import { RootState } from 'reducers/index.reducer';
import { getBlogs } from 'actions/blog.action';
import { Blog } from 'types';
import Button from 'components/Button';
import { Table, Skeleton, Space, Popconfirm, message } from 'antd';
import { convertDate } from 'services/common.service';
import axios from 'services/axios.service';

const BlogPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [blogList, setBlogList] = React.useState([]);
  const blogs = useSelector((state: RootState) => state.blogReducer.blogs);
  const getBlogsError = useSelector((state: RootState) => state.blogReducer.getBlogsError);
  const [view, setView] = React.useState({ type: 'view', blogUrl: null });

  const columns = [
    {
      title: 'Tiêu đề',
      key: 'title',
      dataIndex: 'title',
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
          <a className="action_text" onClick={() => setView({ type: 'edit', blogUrl: record.urlString })}>
            Sửa
          </a>
          <Popconfirm
            title="Bạn có chắc muốn xóa không?"
            onConfirm={() => handleDeleteBlog(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <a className="action_text">Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDeleteBlog = (id: string) => {
    axios
      .delete(`/post/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          message.success('Xóa blog thành công');
          dispatch(getBlogs());
        }
      })
      .catch(() => {
        message.error('Xóa blog thất bại');
      });
  };

  const renderView = (): React.ReactElement => {
    if (view.type === 'create') {
      return <CreateBlog handleChangeView={() => setView({ type: 'view', blogUrl: null })} />;
    } else if (view.type === 'view') {
      return (
        <div className="animate__animated animate__fadeInRight">
          <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Blog</div>
          <div className="flex justify-end pr-10">
            <Button className="text-sm" onClick={() => setView({ type: 'create', blogUrl: null })}>
              Thêm blog
            </Button>
          </div>
          <div className="table p-10 w-full">
            {blogList ? <Table columns={columns} dataSource={blogList} /> : <Skeleton />}
          </div>
        </div>
      );
    } else {
      return <EditBlog handleChangeView={() => setView({ type: 'view', blogUrl: null })} blogUrl={view.blogUrl} />;
    }
  };

  React.useEffect(() => {
    dispatch(getBlogs());
  }, []);

  React.useEffect(() => {
    if (blogs) {
      const blogList = (Object.values(blogs) as Array<Blog>).map((blog) => ({
        ...blog,
        key: blog._id,
      }));

      setBlogList(blogList);
    }
  }, [blogs]);

  React.useEffect(() => {
    if (getBlogsError) {
      message.error('Lấy vouchers thất bại');
    }
  }, [getBlogsError]);

  return renderView();
};

export default BlogPage;
