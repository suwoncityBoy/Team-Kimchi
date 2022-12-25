import { React, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { StyledContainer, StyledWrap } from './Navbar.style';

export default function Navbar() {
  const initialState = [
    {
      id: 1,
      value: '배추과 김치',
      isHovered: false,
      imgUrl: 'Navbar_icon_star.png',
    },
    {
      id: 2,
      value: '무과 김치',
      isHovered: false,
      imgUrl: 'Navbar_icon_circle.png',
    },
    {
      id: 3,
      value: '뿌리과 김치',
      isHovered: false,
      imgUrl: 'Navbar_icon_square.png',
    },
    {
      id: 4,
      value: '기타 김치',
      isHovered: false,
      imgUrl: 'Navbar_icon_triangle.png',
    },
  ];

  const [hoverState, setHoverState] = useState(initialState);

  const onHoverHandler = (item) => {
    // hoverState.filter((data) => data.id === item.id);
    // return setHoverState({ ...hoverState, isHovered: !item.isHovered });
    // .map((item) =>
    //   setHoverState({ ...hoverState, isHovered: !item.isHovered }),
    // );
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
          />

          <BsCart3 className="Navbar_Cart" />

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
                  key={item.id}
                />
                <div
                  className={`${
                    item.isHovered !== false ? 'textBalloon' : 'hoverText'
                  }`}
                >
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
