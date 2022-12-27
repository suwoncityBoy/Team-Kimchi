import React from 'react';

export default function Textarea({ label, content, onChange }) {
  return (
    <label style={contentLabelStyle}>
      {label}
      <textarea
        type="text"
        value={content}
        onChange={onChange}
        maxLength="300"
        style={textareaStyle}
      />
    </label>
  );
}

const contentLabelStyle = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
};

const textareaStyle = {
  fontSize: '16px',
  resize: 'none',
  margin: '16px 0',
  height: '200px',
  border: '1px solid #c2c2c2',
  borderRadius: '4px',
  fontFamily: 'normal',
};
