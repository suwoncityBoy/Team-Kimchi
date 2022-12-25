import React from 'react';
import styled from 'styled-components';

export default function Flim({ s, slide }) {
  const ImageBox = styled.div`
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
  `;
  return (
    <div
      className="film"
      id={s.id}
      style={{
        transform: `translateX(${slide}px)`,
        transition: '0.5s ease',
        width: '21%',
        height: '21%',
        marginBottom: '2rem',
      }}
    >
      <ImageBox>
        <img
          src={`${process.env.PUBLIC_URL}${s.image}`}
          alt=""
          style={{
            position: 'absolute',
            top: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </ImageBox>
      <h1>{s.name}</h1>
      <p>{s.price}</p>
      <p>{s.description}</p>
    </div>
  );
}
