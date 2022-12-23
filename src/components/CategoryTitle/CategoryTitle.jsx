import React from 'react';
import styled from 'styled-components';

export default function CategoryTitle({ children }) {
  const TextWrap = styled.div`
    padding: 3.6rem 0 2.6rem;
    text-align: center;
    font-size: 1.6rem;
    font-weight: 500;
    opacity: 0.5;
    transform: translateY(10%);
    transition: all ease 0.5s;
    &:hover {
      opacity: 1;
      transform: translateY(-20%);
    }
  `;

  return <TextWrap>{children}</TextWrap>;
}
