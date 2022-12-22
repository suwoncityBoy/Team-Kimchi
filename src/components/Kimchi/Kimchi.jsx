import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import styled from 'styled-components';

export default function Kimchi() {
  const Icon = styled.div`
    background-color: #1e602b;
    opacity: 0.5;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: all ease 0.5s;
    &:hover {
      opacity: 1;
      transform: rotate(360deg);
    }
  `;

  return (
    <div
      style={{
        width: '21%',
        height: '21%',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
          overflow: 'hidden',
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/images/kimchi_img1.jpg`}
          style={{
            position: 'absolute',
            top: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          alt="kimchi"
        />
        <Icon>
          <BsCart3
            className="icon"
            style={{
              color: 'white',
              width: '1.4rem',
              height: '1.4rem',
            }}
          />
        </Icon>
      </div>
      <div className="dec" style={{ margin: '1rem 0 1.4rem' }}>
        <h2
          style={{
            fontSize: '1.2rem',
            fontWeight: '500',
            marginBottom: '0.5rem',
          }}
        >
          김치 이름
        </h2>
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1.3rem',
            color: '#393838',
          }}
        >
          8,000원
        </h3>
        <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#666' }}>
          맛있어 김치...
        </p>
      </div>
    </div>
  );
}
