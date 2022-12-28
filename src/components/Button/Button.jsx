import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  width: ${({ small }) => (small ? '100px' : '200px')};
  padding: ${({ small }) => (small ? '0.5rem' : '1rem 0.1rem')};
  box-sizing: border-box;
  background-color: #d82424;
  color: white;
  border: 1px solid #d82424;
  text-align: center;
  font-size: 1rem;
  border-radius: 1rem;
  transition: all ease 0.5s;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #d82424;
    opacity: 1;
  }
`;

export default function Button({ value, type, onClick }) {
  let small = false;
  if (value === '전체삭제') {
    small = true;
  }

  return (
    <ButtonStyle small={small} onClick={onClick} type={type}>
      {value}
    </ButtonStyle>
  );
}
