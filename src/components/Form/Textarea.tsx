import React from 'react';
import { ITextarea } from 'types';

const Textarea = ({
  value,
  className,
  name,
  onChange,
  prefixIcon,
  style,
  error,
  ...config
}: ITextarea): React.ReactElement => {
  return (
    <div
      className={`form__textarea${error ? '--error' : ''} relative ${className ? className : ''}`}
      style={{ ...style }}
    >
      <textarea
        value={value}
        name={name}
        onChange={onChange}
        {...config}
        className={`bg-gray-100 ${prefixIcon ? 'pr-5 pl-12' : 'p-5'} font-xl w-full h-30`}
      />

      <span className="relative text-xs text-red-600">{error}</span>

      {prefixIcon && (
        <div className="form__icon-prefix h-full absolute bg-white flex items-center justify-center">
          <img src={prefixIcon} alt="input-icon" className="w-1/2" />
        </div>
      )}
    </div>
  );
};

export default Textarea;
