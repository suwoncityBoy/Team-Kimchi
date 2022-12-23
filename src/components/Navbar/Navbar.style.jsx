import styled from 'styled-components';

const StyledContainer = styled.div`
  background-color: white;
  position: fixed;
  height: 100%;
  right: 0px;
  width: 150px;
  box-shadow: 0 0 0 3px #d82424 inset;

  .Navbar_Logo {
    width: 90px;
    height: 80px;
  }
  .Navbar_Cart {
    width: 40px;
    height: 40px;
  }
  .Icon {
    width: 50px;
    height: 50px;
  }
`;

const StyledWrap = styled.div`
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 100px;
  padding-left: 20px;
  padding-right: 20px;
`;

export { StyledContainer, StyledWrap };
