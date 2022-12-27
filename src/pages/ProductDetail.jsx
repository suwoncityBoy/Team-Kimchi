import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import DetailMenus from '../components/DetailMenus/DetailMenus';
// import Button from '../components/Button/Button';
import {
  addNumber,
  minusNumber,
  addProduct,
} from '../redux/modules/productDetailSlice';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import RecommendProduct from '../components/RecommendProduct/RecommendProduct';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { price, image, name, description, sum } = useSelector(
    (state) => state.productDetail.product,
  );

  const { number } = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();

  const getData = async () => {
    const response = await axios.get(`http://localhost:3001/kimchis/${id}`);
    const { name, image, price, description } = response.data; // price
    const object = {
      name,
      image,
      price, // 초기값
      sum: price, // 합계
      description,
    };
    dispatch(addProduct({ ...object }));
  };

  useEffect(() => {
    getData();
    // 페이지 이동 시 최상단으로 스크롤
    window.scrollTo(0, 0);
  }, [id]);

  const onClickHandler = () => {
    if (window.confirm('장바구니로 이동하시겠습니까??')) {
      navigate('/cart');
    }
  };

  return (
    <>
      <StyleContainer>
        <StyleDetailWrap>
          <StyleDetailWrapItems>
            <StyleImageWrap>
              <img
                src={process.env.PUBLIC_URL + image}
                style={{ Width: '100%', height: '100%' }}
                alt="img"
              ></img>
            </StyleImageWrap>

            <div
              style={{
                position: 'relative',
                // backgroundColor: 'yellow',
                height: '90%',
                width: '50%',
              }}
            >
              <div>
                <div style={{ lineHeight: '2.2', marginTop: '10px' }}>
                  <p style={{ fontSize: '40px' }}>{name}</p>
                  <p style={{ fontSize: '25px', color: '#979797' }}>
                    {description}
                  </p>
                  <h1 style={{ fontSize: '40px' }}>{price}원</h1>
                </div>

                <div style={{ display: 'flex', marginTop: '50px' }}>
                  <p
                    style={{
                      fontSize: '25px',
                      width: '20%',
                      paddingTop: '20px',
                    }}
                  >
                    상품선택
                  </p>
                  <div
                    style={{
                      border: 'solid 1px #000',
                      padding: '20px',
                      height: '100px',
                      width: '80%',
                    }}
                  >
                    <p>{name}</p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '50px',
                      }}
                    >
                      <StyledAmountSelect>
                        <button
                          className="btnMinus"
                          onClick={() => dispatch(minusNumber(price))}
                          disabled={number <= 1 ? true : false}
                        >
                          - {/* 제품의 고유 가격 넣기*/}
                        </button>
                        <span className="amount">{number}</span>

                        {/* state에서 가져온 합 가격 넣기*/}
                        <button
                          className="btnPlus"
                          onClick={() => dispatch(addNumber(price))}
                        >
                          {' '}
                          {/* 제품의 고유 가격 넣기*/}
                        </button>
                        <div className="totalPrice">{sum}</div>
                      </StyledAmountSelect>
                      {/* <p>??</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StyleDetailWrapItems>
        </StyleDetailWrap>
        <div>
          {/* 메뉴 바 */}
          <DetailMenus />
          <div style={divStyle}>
            {/* 메뉴 바 밑에 보여줄 페이지 */}
            <Outlet />
          </div>
        </div>
        <RecommendProduct />
      </StyleContainer>
    </>
  );
}

const StyleContainer = styled.div`
  margin: 1.5rem;
`;

const StyleDetailWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleDetailWrapItems = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
  align-items: center;
`;

const StyleImageWrap = styled.div`
  width: 40%;
`;

const divStyle = {
  width: '100%',
  textAlign: 'center',
};

const StyledAmountSelect = styled.div`
  display: flex;
  align-items: center;
  height: 35px;

  .btnMinus {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 35px;
    height: 35px;
    border: 1px solid #e3e3e3;
    border-radius: 2px 0px 0px 2px;
    background-color: #f8fafb;
    font-size: 30px;
    text-align: center;
  }
  .amount {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 35px;
    box-sizing: border-box;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    font-weight: 700;
    color: #242424;
  }
  .btnPlus {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border: 1px solid #e3e3e3;
    border-radius: 0px 2px 2px 0px;
    background-color: #f8fafb;
  }
  .btnPlus::before {
    content: '';
    display: block;
    width: 10px;
    height: 2px;
    background-color: black;
  }
  .btnPlus::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 2px;
    height: 10px;
    background-color: black;
    transform: translate(-50%, -50%);
  }
`;
