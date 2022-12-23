import styled from 'styled-components';

const StyledContainer = styled.div`
  background-color: #d82424;
  width: 100%;
  position: absolute;
  bottom: 0;

  h4 {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  article {
    font-size: 12px;
  }
  .Navbar_Logo {
    width: 100px;
    height: 20px;
    margin-right: 20px;
  }
`;

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 30px 150px 20px 20px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
`;

const StyledLogo = styled.div`
  display: flex;
  justify-content: right;
`;

export { StyledContainer, StyledWrap, StyledLogo };
