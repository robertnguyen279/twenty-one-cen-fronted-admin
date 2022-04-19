import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, message, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser, deleteUserByAdmmin } from 'actions/user.action';
import { RootState } from 'reducers/index.reducer';
import { Skeleton } from 'antd';
import { User } from 'types';
import { transfromInterPhone } from 'services/common.service';
import Button from 'components/Button';
import CreateUser from './CreateUser';

const Users = (): React.ReactElement => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.userReducer.users);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const getUsersError = useSelector((state: RootState) => state.userReducer.getUsersError);
  const deleteUserError = useSelector((state: RootState) => state.userReducer.deleteUserError);
  const deleteUserSuccess = useSelector((state: RootState) => state.userReducer.deleteUserSuccess);
  const [usersData, setUsersData] = useState([]);
  const [view, setView] = useState('view');

  const confirmDelete = (id: string) => {
    if (user.role === 'superviser') {
      dispatch(deleteUser(id));
    } else {
      dispatch(deleteUserByAdmmin(id));
    }
  };

  const handleCreateUserClick = () => {
    setView('create');
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => <div>{phone ? transfromInterPhone(phone.toString()) : 'Chưa cập nhật'}</div>,
    },
    {
      title: 'Vai trò',
      key: 'role',
      dataIndex: 'role',
      render: (role): React.ReactElement => {
        if (role === 'admin') {
          return <Tag color="red">ADMIN</Tag>;
        } else if (role === 'superviser') {
          return <Tag color="blue">GIÁM SÁT</Tag>;
        } else {
          return <Tag color="green">NGƯỜI DÙNG</Tag>;
        }
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* <a className="action_text">Sửa</a> */}
          <Popconfirm
            title="Bạn có chắc muốn xóa không?"
            onConfirm={() => confirmDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <a className="action_text">Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (users) {
      const userData = (Object.values(users) as Array<User>).map((user) => ({
        key: user._id.toString(),
        ...user,
      }));
      setUsersData(userData);
    }
  }, [users]);

  useEffect(() => {
    if (getUsersError && getUsersError.includes('Lỗi khi tải dữ liệu')) {
      message.error('Lôĩ khi tải dữ liệu');
    }
  }, [getUsersError]);

  useEffect(() => {
    if (deleteUserError) {
      message.error('Xóa người dùng thất bại');
    }
  }, [deleteUserError]);

  useEffect(() => {
    if (deleteUserSuccess) {
      message.success('Xóa người dùng thành công');
      dispatch(getUsers());
    }
  }, [deleteUserSuccess]);

  const renderView = () => {
    if (view === 'view') {
      return (
        <div className="animate__animated animate__fadeInRight">
          <div className="title text-2xl font-bold md:py-20 py-10 text-center">Người dùng</div>
          {user && user.role === 'admin' && (
            <div className="flex justify-end pr-10">
              <Button className="text-sm" onClick={handleCreateUserClick}>
                Thêm người dùng
              </Button>
            </div>
          )}
          <div className="table p-10 w-full">
            {usersData.length ? <Table columns={columns} dataSource={usersData} /> : <Skeleton />}
          </div>
        </div>
      );
    } else if (view === 'create') {
      return <CreateUser handleChangeView={() => setView('view')} />;
    } else {
      return <div>Edit</div>;
    }
  };

  return renderView();
};

export default Users;
