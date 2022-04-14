import React, { useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'actions/user.action';
import { RootState } from 'reducers/index.reducer';
import { Skeleton } from 'antd';

const Users = (): React.ReactElement => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.userReducer.users);

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
      render: (phone) => <div>{phone ? phone : 'Chưa cập nhật'}</div>,
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
          <a>Sửa</a>
          <a>Xóa</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  console.log(users);
  return (
    <div>
      <div className="title text-2xl font-bold md:py-20 text-center">Người dùng</div>
      <div className="table p-10 w-full">
        {users ? <Table columns={columns} dataSource={Object.values(users)} /> : <Skeleton />}
      </div>
    </div>
  );
};

export default Users;
