import React from 'react';
import { ICheckBox } from 'types';

const CheckBox = ({ name, value, label, className, onChange }: ICheckBox): React.ReactElement => {
  return (
    <div className={`form__checkbox flex items-center ${className ? className : ''}`}>
      <input type="checkbox" name={name} value={value} id={name} className="z-10" onChange={onChange} />
      <span className="form__checkbox__checkmark">.</span>
      <label htmlFor={name} className="pl-3 cursor-pointer text-sm text-gray-600">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
