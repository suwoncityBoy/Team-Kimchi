import { React } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { StyledContainer, StyledWrap } from './Navbar.style';

export default function Navbar() {
  return (
    <StyledContainer>
      <StyledWrap>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
            className="Navbar_Logo"
            src={`${process.env.PUBLIC_URL}/images/common/Logo.png`}
            alt=""
          />
        </Link>

        <BsCart3 className="Navbar_Cart" />
        <div>
          <Link to="/categories/배추과김치">
            <img
              className="Icon"
              src={`${process.env.PUBLIC_URL}/images/common/Navbar_icon_star.png`}
              alt=""
            />
          </Link>
        </div>
        <Link to="/categories/무과김치">
          <img
            className="Icon"
            src={`${process.env.PUBLIC_URL}/images/common/Navbar_icon_circle.png`}
            alt=""
          />
        </Link>
        <Link to="/categories/뿌리과김치">
          <img
            className="Icon"
            src={`${process.env.PUBLIC_URL}/images/common/Navbar_icon_square.png`}
            alt=""
          />
        </Link>
        <Link to="/categories/기타김치">
          <img
            className="Icon"
            src={`${process.env.PUBLIC_URL}/images/common/Navbar_icon_triangle.png`}
            alt=""
          />
        </Link>
      </StyledWrap>
    </StyledContainer>
  );
}
