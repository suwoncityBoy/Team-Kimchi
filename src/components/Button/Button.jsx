import React from 'react';
import styled from 'styled-components';

export default function Button({ value, type, onClick }) {
  const ButtonStyle = styled.button`
    width: 200px;
    padding: 1.4rem 2rem;
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

  return (
    <ButtonStyle onClick={onClick} type={type}>
      {value}
    </ButtonStyle>
  );
}
