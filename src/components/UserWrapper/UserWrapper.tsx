import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/index.reducer';
import { Avatar } from 'antd';
import { Skeleton } from 'antd';

const UserWrapper = (): React.ReactElement => {
  const user = useSelector((state: RootState) => state.userReducer.user);

  return (
    <div className="user_wrapper p-2 flex flex-col items-center justify-center ">
      {user ? (
        <React.Fragment>
          <div className="avatar">
            {user.avatarUrl ? (
              <Avatar size={60} src={user.avatarUrl} />
            ) : (
              <Avatar size={60}>{user.firstName[0] + user.lastName[0]}</Avatar>
            )}
          </div>
          <div className="welcome_text text-lg mt-2">Chào mừng</div>
          <div className="name text-xl mt-1 font-bold">{user.fullName}</div>
        </React.Fragment>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default UserWrapper;
