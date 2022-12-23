import React from 'react';

export default function Review() {
  return (
    <div style={{ display: 'flex', padding: '10px' }}>
      <form style={{ width: '100%' }}>
        <div style={{ textAlign: 'left', margin: '30px 0' }}>
          <label>
            닉네임
            <input type="text" style={inputStyle} />
          </label>
          <label>
            비밀번호
            <input type="password" style={inputStyle} />
          </label>
        </div>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
          }}
        >
          자세한 후기를 들려주세요
          <textarea style={textareaStyle} type="text" />
        </label>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button type="submit" style={btnStyle}>
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}

const textareaStyle = {
  resize: 'none',
  margin: '16px 0',
  height: '200px',
  border: '1px solid #c2c2c2',
  borderRadius: '4px',
};

const btnStyle = {
  backgroundColor: 'red',
  padding: '10px 20px',
  border: 'none',
  color: ' white',
};

const inputStyle = {
  margin: '0 16px',
  height: '24px',
  width: '200px',
  border: '1px solid #c2c2c2',
  borderRadius: '4px',
};
