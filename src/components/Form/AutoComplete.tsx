import React from 'react';
import { IAutoComplete } from 'types';
import { AutoComplete } from 'antd';

const AutoCompleteComp = ({
  className,
  onChange,
  prefixIcon,
  options,
  initialValue,
  style,
  error,
  ...config
}: IAutoComplete): React.ReactElement => {
  return (
    <div
      className={`form__autocomplete${error ? '--error' : ''} relative ${className ? className : ''}`}
      style={{ ...style }}
    >
      <AutoComplete
        onChange={onChange}
        {...config}
        options={options}
        defaultValue={initialValue || ''}
        className={`bg-gray-100 ${prefixIcon ? 'pr-5 pl-12' : ''} font-xl w-full h-10`}
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

export default AutoCompleteComp;
