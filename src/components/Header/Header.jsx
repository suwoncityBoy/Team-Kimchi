import React from 'react';
import { StyledBanner } from './Header.style';

export default function Header() {
  return (
    <StyledBanner>
      <img
        className="Banner"
        src={`${process.env.PUBLIC_URL}/images/Banner.png`}
        alt=""
      />
    </StyledBanner>
  );
}
