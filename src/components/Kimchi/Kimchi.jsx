import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsCart3 } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { addItem } from '../../redux/modules/cartSlice';

export default function Kimchi({ k }) {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(0);
  const dispatch = useDispatch();
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

  const ImageBox = styled.div`
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
  `;

  const toCart = () => {
    k.checked = true;
    k.number = 1;
    dispatch(addItem(k));
    alert('장바구니에 담았습니다');
  };

  return (
    <div
      onMouseOver={() => setIsHovering(1)}
      onMouseOut={() => setIsHovering(0)}
      style={{
        width: '21%',
        height: '21%',
        marginBottom: '2rem',
        cursor: 'pointer',
      }}
    >
      <ImageBox>
        {k && (
          <img
            src={`${process.env.PUBLIC_URL}${k.image}`}
            style={{
              position: 'absolute',
              top: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            alt="kimchi"
            onClick={() => {
              navigate(`/kimchis/${k.id}/description`);
            }}
          />
        )}

        {isHovering ? (
          <Icon onClick={toCart}>
            <BsCart3
              className="icon"
              style={{
                color: 'white',
                width: '1.4rem',
                height: '1.4rem',
              }}
            />
          </Icon>
        ) : (
          ''
        )}
      </ImageBox>

      {k && (
        <div className="dec" style={{ margin: '1rem 0 1.4rem' }}>
          <h2
            style={{
              fontSize: '1.2rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
            }}
          >
            {k.name}
          </h2>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '1.3rem',
              color: '#393838',
            }}
          >
            {k.price}원
          </h3>

          <p style={{ fontSize: '1rem', fontWeight: '500', color: '#666' }}>
            {k.description}
          </p>
        </div>
      )}
    </div>
  );
}
