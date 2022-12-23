import React from 'react';
import { StyledContainer, StyledWrap, StyledLogo } from './Footer.style';

export default function Footer() {
  return (
    <StyledContainer>
      <StyledWrap>
        <h4>김치 주식회사</h4>
        <article>
          본사: 메타버스 스파르타 ZEP 사무실: ZEP 리액트 4조
          <br />
          호스팅 제공자: (주)스파르타 사업자등록번호: 221031 고객센터:
          02-221222-5959
          <br />
          공동대표 이학경 박진양 성효진 김우상 유승민
          <br />
          KIMCHI COMPANY
          <br />
        </article>
        <StyledLogo>
          <img
            className="Navbar_Logo"
            src={`${process.env.PUBLIC_URL}/images/Footer_Logo.png`}
            alt=""
          />
        </StyledLogo>
      </StyledWrap>
    </StyledContainer>
  );
}
