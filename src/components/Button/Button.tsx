import React from 'react';
import { IButton } from 'types';

const Button = ({ className, children, onClick, isLoading, type, style, ...config }: IButton): React.ReactElement => {
  return (
    <button
      className={`button${isLoading ? '--loading' : ''} text-base text-white cursor-pointer ${
        className ? className : ''
      }`}
      onClick={onClick}
      type={type}
      style={{ ...style }}
      {...config}
    >
      {children}
    </button>
  );
};

export default Button;
