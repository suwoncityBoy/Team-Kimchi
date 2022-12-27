import React from 'react';

export default function Input({ label, type, value, onChange, maxLength }) {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        style={inputStyle}
      />
    </label>
  );
}

const inputStyle = {
  margin: '0 16px',
  height: '24px',
  width: '200px',
  border: '1px solid #c2c2c2',
  borderRadius: '4px',
  fontFamily: 'normal',
  fontSize: '16px',
};
