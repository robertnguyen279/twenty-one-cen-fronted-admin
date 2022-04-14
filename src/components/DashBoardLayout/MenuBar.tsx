import React from 'react';
import UserWrapper from 'components/UserWrapper';
import MenuWrapper from 'components/MenuWrapper';

const MenuBar = (): React.ReactElement => {
  return (
    <div className="menu_bar">
      <UserWrapper />
      <MenuWrapper />
    </div>
  );
};

export default MenuBar;
