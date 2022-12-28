import { React, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { StyledContainer, StyledWrap, StyledCartNumWrap } from './Navbar.style';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Navbar() {
  const cart = useSelector((state) => state.user.inCart);

  const initialState = [
    {
      id: 1,
      value: '배추과김치',
      isHovered: false,
      imgUrl: 'Navbar_icon_star.png',
      color: '#ff9b9b',
    },
    {
      id: 2,
      value: '무과김치',
      isHovered: false,
      imgUrl: 'Navbar_icon_circle.png',
      color: '#9BC3FF',
    },
    {
      id: 3,
      value: '뿌리과김치',
      isHovered: false,
      imgUrl: 'Navbar_icon_square.png',
      color: '#FFE99B',
    },
    {
      id: 4,
      value: '기타김치',
      isHovered: false,
      imgUrl: 'Navbar_icon_triangle.png',
      color: '#9DFF9B',
    },
  ];

  const [hoverState, setHoverState] = useState(initialState);
  const navigate = useNavigate();

  const onHoverHandler = (item) => {
    for (let i in hoverState) {
      if (hoverState[i].id === item.id) {
        hoverState[i].isHovered = !item.isHovered;
        setHoverState([...hoverState]);
      }
    }
  };

  return (
    <div>
      <StyledContainer>
        <StyledWrap>
          <img
            className="Navbar_Logo"
            src={`${process.env.PUBLIC_URL}/images/common/Logo.png`}
            alt=""
            onClick={() => {
              navigate(`/`);
            }}
          />

          {cart.length ? (
            <StyledCartNumWrap>
              <div className="CartNum">{cart.length}</div>
            </StyledCartNumWrap>
          ) : (
            ''
          )}
          <BsCart3 className="Navbar_Cart" onClick={() => navigate(`/cart`)} />

          {hoverState.map((item) => {
            return (
              <div>
                <img
                  className={`${
                    item.isHovered !== false ? 'hoverState' : 'Icon'
                  }`}
                  src={`${process.env.PUBLIC_URL}/images/common/${item.imgUrl}`}
                  alt=""
                  onMouseEnter={() => onHoverHandler(item)}
                  onMouseLeave={() => onHoverHandler(item)}
                  onClick={() => {
                    navigate(`/categories/${item.value}`);
                  }}
                  key={item.id}
                />

                <div
                  className={`${item.isHovered ? 'textBalloon' : 'hoverText'}`}
                  style={{
                    backgroundColor: item.color,
                  }}
                >
                  <div
                    className={`${
                      item.isHovered ? 'textBalloonBottom' : 'hoverText'
                    }`}
                    style={{
                      borderRightColor: item.color,
                    }}
                  ></div>
                  {item.value}
                </div>
              </div>
            );
          })}
        </StyledWrap>
      </StyledContainer>
    </div>
  );
}
