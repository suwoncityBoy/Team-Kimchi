import React from 'react';

export default function EditForm({ onSubmit, editContent, onChange }) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <textarea
        style={textareaStyle}
        value={editContent}
        onChange={onChange}
        autoFocus={true}
      ></textarea>
      <button style={btnStyle}>확인</button>
    </form>
  );
}

const textareaStyle = {
  width: '600px',
  height: '100px',
  resize: 'none',
  border: '1px solid #c2c2c2',
  borderRadius: '4px',
  fontSize: '16px',
  fontFamily: 'normal',
};

const btnStyle = {
  fontSize: '14px',
  border: '1px solid grey',
  borderRadius: '4px',
  background: 'transparent',
  padding: '4px 8px ',
  margin: '10px 0',
  cursor: 'pointer',
  width: '50px',
};
