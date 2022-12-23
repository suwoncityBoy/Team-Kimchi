import { React } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { StyledContainer, StyledWrap } from './Navbar.style';

export default function Navbar() {
  return (
    <StyledContainer>
      <StyledWrap>
        <img
          className="Navbar_Logo"
          src={`${process.env.PUBLIC_URL}/images/Logo.png`}
          alt=""
        />

        <BsCart3 className="Navbar_Cart" />
        <div>
          <img
            className="Icon"
            src={`${process.env.PUBLIC_URL}/images/Navbar_icon_star.png`}
            alt=""
          />
        </div>
        <img
          className="Icon"
          src={`${process.env.PUBLIC_URL}/images/Navbar_icon_circle.png`}
          alt=""
        />
        <img
          className="Icon"
          src={`${process.env.PUBLIC_URL}/images/Navbar_icon_square.png`}
          alt=""
        />
        <img
          className="Icon"
          src={`${process.env.PUBLIC_URL}/images/Navbar_icon_triangle.png`}
          alt=""
        />
      </StyledWrap>
    </StyledContainer>
  );
}
