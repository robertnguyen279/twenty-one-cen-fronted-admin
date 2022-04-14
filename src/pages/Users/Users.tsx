import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'actions/user.action';
import { RootState } from 'reducers/index.reducer';
import { Skeleton } from 'antd';
import { User } from 'types';
import { transfromInterPhone } from 'services/common.service';

const Users = (): React.ReactElement => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.userReducer.users);
  const error = useSelector((state: RootState) => state.userReducer.errorMessage);
  const [usersData, setUsersData] = useState();

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
      render: () => (
        <Space size="middle">
          <a className="action_text">Sửa</a>
          <a className="action_text">Xóa</a>
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

  return (
    <div>
      <div className="title text-2xl font-bold md:py-20 text-center">Người dùng</div>
      <div className="table p-10 w-full">
        {usersData ? <Table columns={columns} dataSource={Object.values(users) as Array<User>} /> : <Skeleton />}
      </div>
    </div>
  );
};

export default Users;
