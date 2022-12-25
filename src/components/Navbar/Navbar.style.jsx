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
  .hoverState {
    position: relative;
    width: 75px;
    height: 75px;
    transform: scale(1.2);
  }
  .textBalloon {
    position: absolute;
    margin-top: -100px;
    margin-left: -5px;
    border-radius: 5px;
    background-color: #ff9b9b;
    padding: 10px;
    color: black;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 50px;
  }
  .textBalloon::before {
    content: '';
    position: absolute;
    right: 100%;
    top: 23px;
    width: 0;
    height: 0;
    right: 65px;
    transform: rotate(33deg);
    border-top: 10px solid transparent;
    border-right: 10px solid #ff9b9b;
    border-bottom: 10px solid transparent;
  }
  .hoverText {
    display: none;
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
