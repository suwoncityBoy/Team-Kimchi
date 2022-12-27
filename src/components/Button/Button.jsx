import React from 'react';
import styled from 'styled-components';

export default function Button({ value, type, onClick }) {
  const ButtonStyle = styled.button`
    width: 200px;
    padding: 1.4rem 2rem;
    box-sizing: border-box;
    border: 1px solid var(--btnbordercolor);
    text-align: center;
    font-size: 1rem;
    border-radius: 2rem;
    transition: all ease 0.5s;
    &:hover {
      background-color: var(--btnbgcolor);
      opacity: 1;
      color: white;
    }
  `;

  return (
    <ButtonStyle onClick={onClick} type={type}>
      {value}
    </ButtonStyle>
  );
}
