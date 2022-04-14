import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, message, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser } from 'actions/user.action';
import { RootState } from 'reducers/index.reducer';
import { Skeleton } from 'antd';
import { User } from 'types';
import { transfromInterPhone } from 'services/common.service';
import Button from 'components/Button';
import EditUser from './EditUser';

const Users = (): React.ReactElement => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.userReducer.users);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const error = useSelector((state: RootState) => state.userReducer.errorMessage);
  const [usersData, setUsersData] = useState();
  const [editUser, setEditUser] = useState(false);

  const confirmDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleCreateUserClick = () => {
    setEditUser(true);
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
          <a className="action_text">Sửa</a>
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
      (Object.values(users) as Array<User>).forEach((user) => {
        user.key = user._id.toString();
      });
    }
    setUsersData(users);
  }, [users]);

  useEffect(() => {
    if (error) {
      message.error('Lôĩ khi tải dữ liệu');
    }
  }, [error]);

  return editUser ? (
    <EditUser />
  ) : (
    <div>
      <div className="title text-2xl font-bold md:py-20 text-center">Người dùng</div>
      {user && user.role === 'admin' && (
        <div className="flex justify-end pr-10">
          <Button className="text-sm" onClick={handleCreateUserClick}>
            Thêm người dùng
          </Button>
        </div>
      )}
      <div className="table p-10 w-full">
        {usersData ? <Table columns={columns} dataSource={Object.values(users) as Array<User>} /> : <Skeleton />}
      </div>
    </div>
  );
};

export default Users;
