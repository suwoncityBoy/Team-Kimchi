import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addNumber, minusNumber } from '../redux/modules/productDetailSlice';
import DetailMenus from '../components/DetailMenus/DetailMenus';
import RecommendProduct from '../components/RecommendProduct/RecommendProduct';

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { number, price } = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();

  const [dataPath, setDataPath] = useState('');

  // const getData = async () => {
  //   const { data } = await axios.get('http://localhost:3001/kimchis');
  //   setDataPath(data);
  // };

  // /kimchis/:id 경로로 들어오면 description 페이지로 자동 이동
  useEffect(() => {
    if (currentPath === `/kimchis/${id}` || currentPath === `/kimchis/${id}/`) {
      navigate(`/kimchis/${id}/description`, { replace: true });
      // getData();
    }
  }, [currentPath, id, navigate]);

  console.log(dataPath);

  return (
    <>
      <StyleContainer>
        <StyleDetailWrap>
          <StyleDetailWrapItems>
            <StyleImageWrap>
              <img
                src={process.env.PUBLIC_URL}
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
                <p style={{ fontSize: '40px' }}>[종가집]하루세끼 맛김치</p>
                <p style={{ fontSize: '25px' }}>손질없이 어디서나 간편하게</p>
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
                  <p>[종가집] 하루세끼 맛김치</p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '50px',
                    }}
                  >
                    <div>
                      <button onClick={() => dispatch(minusNumber())}>-</button>
                      <span>{number}</span>
                      <button onClick={() => dispatch(addNumber())}>+</button>
                    </div>
                    <p>price</p>
                  </div>
                </div>
              </div>

              <button
                style={{
                  position: 'absolute',
                  right: '0',
                  bottom: '0',
                  backgroundColor: 'red',
                  color: '#fff',
                  width: '300px',
                  height: '100px',
                }}
              >
                장바구니 담기
              </button>
            </div>
          </StyleDetailWrapItems>
        </StyleDetailWrap>
        <div>
          {/* 메뉴 바 */}
          <DetailMenus />
          <div style={divStyle}>
            {/* 메뉴 바 밑에 보여줄 페이지 */}
            <Outlet />
            <RecommendProduct />
          </div>
        </div>
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
