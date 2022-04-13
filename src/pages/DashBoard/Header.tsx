import React from 'react';
import RightHeader from 'components/RightHeader';

const Header = (): React.ReactElement => {
  return (
    <div className="header">
      <div className="right_header">
        <RightHeader />
      </div>
    </div>
  );
};

export default Header;
