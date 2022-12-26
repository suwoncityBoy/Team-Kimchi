import React from 'react';

export default function Review({ nickname, content, date }) {
  return (
    <li style={reviewStyle}>
      <div style={nicknameStyle}>{nickname}</div>
      <div style={contentStyle}>{content}</div>
      <div style={dateStyle}>{date}</div>
    </li>
  );
}

const reviewStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '16px 0 20px 0',
};

const nicknameStyle = {
  background: 'pink',
  width: '100px',
};

const contentStyle = {
  background: 'skyblue',
  flex: '1 1 auto',
};

const dateStyle = {
  background: 'lavender',
  width: '200px',
};
