import React from 'react';
import Header from './Header';
import MenuBar from './MenuBar';
import { IDashBoardLayout } from 'types';

const DashboardLayout = ({ children }: IDashBoardLayout): React.ReactElement => {
  return (
    <div>
      <Header />
      <div className="body lg:flex">
        <MenuBar />
        <div className="children pt-10 grow">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
