import React, { useState, useEffect } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import styled from 'styled-components';

export default function ToTopButton() {
  const [showButton, setShowButton] = useState(false);
  // const [animateButton, setAnimateButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const HandleShowButton = () => {
      if (window.scrollY > 150) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', HandleShowButton);
    return () => {
      window.removeEventListener('scroll', HandleShowButton);
    };
  }, []);

  return (
    <>
      <StyleScrollButton
        showButton={showButton}
        // animateButton={animateButton}
        onClick={scrollToTop}
      >
        <AiOutlineArrowUp size="50" color="#d82424">
          Top
        </AiOutlineArrowUp>
      </StyleScrollButton>
    </>
  );
}

const StyleScrollButton = styled.div`
  z-index: 10;
  position: fixed;
  border: solid 1px #d82424;
  background-color: #fff;
  bottom: 50px;
  right: 220px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  display: ${({ showButton }) => (showButton ? 'flex' : 'none')};
`;
