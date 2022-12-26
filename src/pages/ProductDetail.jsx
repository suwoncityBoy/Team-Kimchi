import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import DetailMenus from '../components/DetailMenus/DetailMenus';
import Button from '../components/Button/Button';
import {
  addNumber,
  minusNumber,
  addProduct,
} from '../redux/modules/productDetailSlice';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNumber,
  minusNumber,
  addProduct,
} from '../redux/modules/productDetailSlice';
import DetailMenus from '../components/DetailMenus/DetailMenus';
import KimchiRecommend from '../components/KimchiRecommend/KimchiRecommend';
import KimchiRecommend from '../components/KimchiRecommend/KimchiRecommend';

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const { price, image, name, description, sum } = useSelector(
    (state) => state.productDetail.product,
  );
  const product = useSelector((state) => state.productDetail.product);

  console.log(product);

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

  // /kimchis/:id 경로로 들어오면 description 페이지로 자동 이동
  useEffect(() => {
    getData();
    console.log(currentPath);
    if (currentPath === `/kimchis/${id}` || currentPath === `/kimchis/${id}/`) {
      navigate(`/kimchis/${id}/description`, { replace: true });
      // getData();
    }
  }, []);

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
                <p style={{ fontSize: '25px' }}>{description}</p>
                <h1 style={{ fontSize: '40px' }}>{price}</h1>
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
                      <button onClick={() => dispatch(minusNumber(price))}>
                        {' '}
                        {/* 제품의 고유 가격 넣기*/}-
                      </button>
                      <span>{number}</span> {/* state에서 가져온 합 가격 넣기*/}
                      <button onClick={() => dispatch(addNumber(price))}>
                        {' '}
                        {/* 제품의 고유 가격 넣기*/}+
                      </button>
                      {sum}
                    </div>
                    {/* <p>??</p> */}
                  </div>
                </div>
              </div>
              <Button>장바구니 담기</Button>
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
