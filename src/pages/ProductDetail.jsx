import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import DetailMenus from '../components/DetailMenus/DetailMenus';
import Button from '../components/Button/Button';
import {
  addNumber,
  minusNumber,
  resetNumber,
  addProduct,
} from '../redux/modules/productDetailSlice';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import RecommendProduct from '../components/RecommendProduct/RecommendProduct';
import { SERVER_ADDRESS } from '../utils/constant';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { price, image, name, description, sum, number } = useSelector(
    (state) => state.productDetail.product,
  );

  const dispatch = useDispatch();

  const getData = async () => {
    const response = await axios.get(`${SERVER_ADDRESS}/kimchis/${id}`);
    const { name, image, price, description } = response.data; // price
    const object = {
      name,
      image,
      price, // 초기값
      sum: price, // 합계
      description,
      number: 1,
    };
    dispatch(addProduct({ ...object }));
  };

  useEffect(() => {
    // 수량 선택 초기화
    resetNumber(price);
    // DB에서 제품 상세정보 가져오기
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
                style={{ width: '100%', borderRadius: '8px' }}
                alt="img"
              ></img>
            </StyleImageWrap>

            <div
              style={{
                width: '50%',
                height: '100%',
              }}
            >
              <div>
                <div style={{ lineHeight: '3', marginTop: '10px' }}>
                  <p style={{ fontSize: '24px' }}>{name}</p>
                  <p style={{ fontSize: '18px', color: '#979797' }}>
                    {description}
                  </p>
                  <h1 style={{ fontSize: '30px', fontWeight: '700' }}>
                    {price}
                    <span style={{ fontSize: '18px' }}> 원</span>
                  </h1>
                </div>

                <div style={{ display: 'flex', marginTop: '50px' }}>
                  <p
                    style={{
                      fontSize: '24px',
                      width: '20%',
                      paddingTop: '20px',
                    }}
                  >
                    상품선택
                  </p>
                  <div
                    style={{
                      borderRadius: '8px',
                      border: 'solid 1px #000',
                      padding: '20px',
                      height: '100px',
                      width: '80%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <p>{name}</p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '15px',
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
                      </StyledAmountSelect>
                      <div
                        style={{
                          fontSize: '20px',
                          fontWeight: '700',
                        }}
                        className="totalPrice"
                      >
                        {sum}
                        <span style={{ fontSize: '14px' }}> 원</span>
                      </div>
                      {/* <p>??</p> */}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    right: '0',
                    bottom: '0',
                    marginRight: '40px',
                  }}
                >
                  <Button
                    onClick={onClickHandler}
                    type="button"
                    value="장바구니 담기"
                  ></Button>
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
  min-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleDetailWrapItems = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
  position: relative;
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
