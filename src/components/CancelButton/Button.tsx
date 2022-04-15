import React from 'react';
import { IButton } from 'types';

const Button = ({ className, children, onClick, isLoading, type, ...config }: IButton): React.ReactElement => {
  return (
    <button
      className={`cancel_button${isLoading ? '--loading' : ''} text-base text-white cursor-pointer ${
        className ? className : ''
      }`}
      onClick={onClick}
      type={type}
      {...config}
    >
      {children}
    </button>
  );
};

export default Button;
