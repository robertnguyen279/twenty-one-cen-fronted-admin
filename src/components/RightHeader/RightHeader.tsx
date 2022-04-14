import React from 'react';
import NontificationIcon from 'assets/icons/bell-svgrepo-com.svg';

const RightHeader = (): React.ReactElement => {
  return (
    <div className="right_header flex pt-10 justify-end pr-10">
      <div className="icon cursor-pointer">
        <img src={NontificationIcon} alt="nontification" />
      </div>
    </div>
  );
};

export default RightHeader;
