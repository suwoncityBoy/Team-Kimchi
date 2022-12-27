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
import KimchiRecommend from '../components/KimchiRecommend/KimchiRecommend';

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
              <div style={{ lineHeight: '2.2', marginTop: '100px' }}>
                <p style={{ fontSize: '40px' }}>{name}</p>
                <p style={{ fontSize: '25px', color: '#979797' }}>
                  {description}
                </p>
                <h1 style={{ fontSize: '40px' }}>{price}원</h1>
              </div>

              <div style={{ display: 'flex', marginTop: '80px' }}>
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
                    <div>
                      <button
                        style={{}}
                        onClick={() => dispatch(minusNumber(price))}
                        disabled={number <= 1 ? true : false}
                      >
                        -
                      </button>
                      <span>{number}</span>
                      <button onClick={() => dispatch(addNumber(price))}>
                        +
                      </button>
                      <span>{sum}</span>
                    </div>
                    {/* <p>??</p> */}
                  </div>
                </div>
              </div>
              <button onClick={onClickHandler}>장바구니 담기</button>
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
        <KimchiRecommend />
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
  width: 50%;
`;

const divStyle = {
  width: '100%',
  textAlign: 'center',
};
