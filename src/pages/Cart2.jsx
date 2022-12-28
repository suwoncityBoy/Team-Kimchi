import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { SlBasket } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { DataList } from '../components/Cart/Cart2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import axios from 'axios';
import { SERVER_ADDRESS } from '../utils/constant';
import { updateTotalCount } from '../redux/modules/cartSlice';

//import { CiCircleCheck } from 'react-icons/ci';

export default function Cart() {
  // 장바구니 데이터

  const [inCart, setInCart] = useState([]);
  const [allPay, setAllPay] = useState(0);
  const [stock, setStock] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    // 수량 선택 초기화
    connectionDB();
  }, []);

  const connectionDB = async () => {
    const { data } = await axios.get(`${SERVER_ADDRESS}/cart/`);
    setInCart(data);
    setAllPay(
      data.reduce((sum, kimchi) => {
        return sum + kimchi.price * kimchi.number;
      }, 0),
    );
    setStock(
      data.map((item) => {
        return item.number;
      }),
    );
    setCheckedItems(new Array(data.length).fill(true));
  };

  // 총 금액

  /* 사용하는 훅 */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* 내가 만든  */

  // 전체 박스 핸들러
  const allCheckedHandler = (event) => {
    const checked = event.target.checked;
    setCheckedItems(
      checkedItems.map((item) => {
        return checked;
      }),
    );
    setIsAllChecked((prev) => !prev);
    checked
      ? setAllPay((prev) =>
          inCart.reduce((prev, item, idx) => {
            return prev + item.price * stock[idx];
          }, prev),
        )
      : setAllPay(0);
  };

  // 체크박스
  const checkedItemHandler = (index) => {
    // 몇번째 체크박스에 상태가 변화 되었는지 체크!
    const updatedCheckedState = checkedItems.map((checkItem, checkItemIndex) =>
      checkItemIndex === index ? !checkItem : checkItem,
    );
    // 해당 체크박스 스테이트 갱신
    setCheckedItems(updatedCheckedState);

    //모든 체크 박스들이 다 체크 되어 있는지 확인
    const checkedLength = updatedCheckedState.reduce((sum, currentState) => {
      if (currentState === true) {
        return sum + 1;
      }
      return sum;
    }, 0);
    //모든 체크 박스들이 다 체크 되어 있으면 전체체크박스에 true 넣기
    setIsAllChecked(checkedLength === updatedCheckedState.length);

    // 총 결제금액 갱신하기
    setAllPay(
      updatedCheckedState[index]
        ? allPay + inCart[index].price * stock[index] // 체크 된 경우
        : allPay - inCart[index].price * stock[index], // 체크 푼 경우
    );
  };

  // 전체 삭제, 결제 버튼
  const clearAll = async (message) => {
    if (window.confirm(`${message} 하시겠습니까?`)) {
      try {
        for (let i in inCart) {
          await axios.delete(`${SERVER_ADDRESS}/cart/${i * 1 + 1}`);
        }
        /*state 초기화*/
        setInCart([]);
        setCheckedItems([]);
        setAllPay(0);
        dispatch(updateTotalCount(-inCart.length));
        alert(`${message} 되었습니다.`);
      } catch (e) {
        alert('서버에 오류');
      }
    } else {
      alert('취소되었습니다.');
      return;
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        margin: '70px auto',
      }}
    >
      {/*장바구니 영역*/}
      <div style={basketTitle}>
        <SlBasket style={basketIcon}>장바구니</SlBasket>
      </div>
      {/*전체선택 , 선택삭제 영역*/}
      <div style={choice}>
        <div
          style={{
            width: '94%',
            margin: '0 auto',
            borderBottom: '1px solid grey',
            padding: '2.4rem 0 ',
            boxSizing: 'border-box',
          }}
        >
          <label style={choiceRightMargin30}>
            <input
              type="checkbox"
              style={choiceRightMargin10}
              checked={isAllChecked}
              onChange={(event) => allCheckedHandler(event)}
            />
            <span style={{ margin: '4px' }}>
              전체선택 ({checkedItems.filter((item) => item === true).length}/
              {checkedItems.length})
            </span>
          </label>
          <span style={choiceRightMargin50}>|</span>
          <Button
            onClick={() => clearAll('전체 삭제')}
            value="전체삭제"
            type="button"
          ></Button>
        </div>
      </div>
      {/* 장바구니 내용 영역*/}
      <div style={items}>
        {inCart.length !== 0 ? ( // 장바구니 데이터가 있을 경우에만
          <>
            <ul style={item}>
              <DataList
                inCart={inCart} // 장바구니 데이터 props
                setCheckedItems={setCheckedItems} // 체크박스 관련 props
                checkedItems={checkedItems} // 체크박스 관련 props
                checkedItemHandler={checkedItemHandler}
                setStock={setStock} // 수량 관련 props
                stock={stock} // 수량 관련 props
                setAllPay={setAllPay} // 결제 금액 props
                setInCart={setInCart}
              />
            </ul>

            {/* 결제 금액 , 결제 버튼 영역*/}
            <div
              style={{
                //backgroundColor: 'orange',
                width: '100%',
                height: '25%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  margin: '5rem 0 4rem 0',
                }}
              >
                <p></p>
                <div>결제 예정 금액 : {allPay} 원</div>
              </div>
              <Button
                value="결제하기"
                type="button"
                onClick={() => clearAll('결제')}
              ></Button>
            </div>
          </>
        ) : (
          '장바구니가 비어 있습니다.'
        )}
      </div>
    </div>
  );
}
const thisPage = styled.div`
  //backgroundColor: 'black',
  width: '100%';
  height: '100%';
  //position: 'absolute',
  margin: '70px auto';
  opacity: ${(props) => props.opacity};
`;

const basketTitle = {
  width: '100%',
  textAlign: 'center',
};

const basketIcon = {
  width: '50px',
  height: '50px',
};

const choice = {
  width: '100%',
  height: '5%',
  alignItems: 'center',
  display: 'flex',
};

const choiceRightMargin10 = {
  // 합치기
  marginRight: '10px',
  webkitTransform: 'scale(2)',
};

const choiceRightMargin30 = {
  // 합치기
  marginRight: '10px',
};

const choiceRightMargin50 = {
  // 합치기
  fontWeight: '700',
  marginRight: '15px',
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
