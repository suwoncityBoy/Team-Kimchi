import { React } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { StyledContainer, StyledWrap } from './Navbar.style';
import { useSelector } from 'react-redux';
export default function Navbar() {
  const cart = useSelector((state) => state.cart.addItem);

  return (
    <StyledContainer>
      <StyledWrap>
        <img
          className="Navbar_Logo"
          src={`${process.env.PUBLIC_URL}/images/common/Logo.png`}
          alt=""
        />

        <BsCart3 className="Navbar_Cart" />
        {cart.length}
        <div>
          <img
            className="Icon"
            src={`${process.env.PUBLIC_URL}/images/common/Navbar_icon_star.png`}
            alt=""
          />
        </div>
        <img
          className="Icon"
          src={`${process.env.PUBLIC_URL}/images/common/Navbar_icon_circle.png`}
          alt=""
        />
        <img
          className="Icon"
          src={`${process.env.PUBLIC_URL}/images/common/Navbar_icon_square.png`}
          alt=""
        />
        <img
          className="Icon"
          src={`${process.env.PUBLIC_URL}/images/common/Navbar_icon_triangle.png`}
          alt=""
        />
      </StyledWrap>
    </StyledContainer>
  );
}
