import React from 'react';
import Header from './Header';
import MenuBar from './MenuBar';
import Content from './Content';

const Dashboard = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <div className="body lg:flex">
        <MenuBar />
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
