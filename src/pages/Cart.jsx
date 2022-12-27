import React, { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import { SlBasket } from 'react-icons/sl';
//import { CiCircleCheck } from 'react-icons/ci';

function Data() {
  // 장바구니에 담은 상품 데이터
  return (
    <li
      style={{
        display: 'flex',
        webkitBoxAlign: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '40px',
        margin: 'auto',
        borderBottom: '1px solid grey',
      }}
    >
      {/* 체크 박스*/}
      <label style={{ width: '24px', height: '24px', marginRight: '2%' }}>
        <input type="checkbox" checked />
      </label>
      <img
        src="#"
        style={{ width: '60px', height: '78px', marginRight: '5%' }}
      />
      {/* 상품 이름*/}
      <span style={{ marginRight: '20%' }}>
        [비비고] 완죤 맛있뉸, 아삭 그자체 배추김치
      </span>
      {/* 주문한 상품 갯수 */}
      <div style={{ marginRight: '5%' }}>
        <button>-</button>
        <span>1123</span>
        <button>+</button>
      </div>
      {/* 주문한 상품의 최종 금액 */}
      <span style={{ marginRight: '1%' }}>3000만원</span>
      <button>x</button>
    </li>
  );
}

export default function Cart() {
  // const navigate = useNavigate();
  // navigate(``)

  useEffect(() => {
    // 페이지 이동 시 최상단으로 스크롤
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={thisPage}>
      {/*장바구니 영역*/}
      <div style={basketTitle}>
        <SlBasket style={basketIcon}>장바구니</SlBasket>
      </div>
      {/*전체선택 , 선택삭제 영역*/}
      <div style={choice}>
        <label style={choiceRightMargin30}>
          <input type="checkbox" style={choiceRightMargin10} checked />
          <span>전체선택 (3/3)</span>
        </label>
        <span style={choiceRightMargin30}>|</span>
        <button>선택삭제</button>
      </div>
      {/* 장바구니 내용 영역*/}
      <div style={items}>
        {/* <div>
          <img src={`${process.env.PUBLIC_URL}/images/cabbage.png`}></img>
        </div> */}
        <ul style={item}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={`${process.env.PUBLIC_URL}/images/cabbage.png`}></img>
            <span>배추과 김치</span>
          </div>
          <Data />
          <Data />
          <Data />
        </ul>
        <ul style={item}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={`${process.env.PUBLIC_URL}/images/cabbage.png`}></img>
            <span>뿌리과 김치</span>
          </div>
          <Data />
          <Data />
          <Data />
        </ul>
      </div>
      {/* 결제 금액 , 결제 버튼 영역*/}
      <div
        style={{
          //backgroundColor: 'orange',
          width: '100%',
          height: 'auto',
          display: 'grid',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            margin: '6rem 0 4rem 0',
          }}
        >
          <div>결제 예정 금액 :</div>
          <div>3000만원</div>
        </div>
        <input
          type="button"
          value="결제하기"
          style={{
            display: 'block',
            // textAlign: 'center',
            // alignItems: 'center',
            height: '50px',
            value: '1000',
          }}
        />
      </div>
    </div>
  );
}
const thisPage = {
  //backgroundColor: 'black',
  width: '100%',
  height: '100%',
  //position: 'absolute',
  margin: '70px auto',
};

const basketTitle = {
  // backgroundColor: 'yellow',
  width: '100%',
  height: '15%',
  textAlign: 'center',
};

const basketIcon = {
  width: '20%',
  height: '35%',
  padding: '3%',
};

const choice = {
  width: '100%',
  height: '5%',
  borderBottom: '2px solid',
  alignItems: 'center',
  display: 'flex',
};

const choiceRightMargin10 = {
  // 합치기
  marginRight: '10px',
};

const choiceRightMargin30 = {
  // 합치기
  marginRight: '30px',
};

const choiceRightMargin40 = {
  // 합치기
  marginRight: '40px',
};

const items = {
  //backgroundColor: 'blue',
  width: '100%',
  height: 'auto',
  display: 'block',
  justifyContent: 'center',
  border: '0px solid #c2c2c2', // 이거 지워야함..
  textAlign: 'center',
  alignItems: 'center',
};

const item = {
  margin: '50px',
  padding: 'auto',
  alignItems: 'center',
  display: 'block',
};

const countControl = {
  marginRight: '40px',
};
