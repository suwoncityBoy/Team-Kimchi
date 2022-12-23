import React from 'react';
import styled from 'styled-components';

export default function KimchiDetail() {
  return (
    <div
      style={{
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        marginTop: '30px',
      }}
    >
      <ul
        style={{
          display: 'flex',
        }}
      >
        <Li>상품설명</Li>
        <Li>레시피</Li>
        <Li>후기</Li>
      </ul>
    </div>
  );
}

const Li = styled.li`
  border: 1px solid #c2c2c2;
  text-align: center;
  flex: 1 1 auto;
  padding: 20px;
`;
