import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { SlBasket } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { DataList } from '../components/Cart/Cart';
import { useNavigate } from 'react-router-dom';
import { clearItem } from '../redux/modules/cartSlice';
import styled from 'styled-components';
import Button from '../components/Button/Button';

//import { CiCircleCheck } from 'react-icons/ci';

export default function Cart() {
  // 장바구니 데이터
  const { inCart } = useSelector((state) => state.user);
  //const inCart = JSON.parse(localStorage.getItem('inCart'));

  // 총 금액 셋팅하기
  const TotalPrice = inCart.reduce((sum, kimchi) => {
    return sum + kimchi.price * kimchi.number;
  }, 0);

  // 총 금액
  const [allPay, setAllPay] = useState(TotalPrice);

  const arr = inCart.map((item) => {
    return item.number;
  });
  // 선택 제품 갯수
  const [stock, setStock] = useState(arr);
  //const [stock, setStock] = useState();
  // 전체 선택 체크박스
  const [isAllChecked, setAllChecked] = useState(true);

  // 체크박스 하나
  const [checkedState, setCheckedState] = useState(
    new Array(inCart.length).fill({ checked: true, active: 'block', price: 0 }),
  );

  const [opacity, setOpacity] = useState('0.5');
  // const [thisPay, setThisPay] = useState(
  //   new Array(inCart.length).fill([{ ...inCart.price }]),
  // );

  /* 사용하는 훅 */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* 내가 만든  */
  // 체크박스 모두 선택
  const handleAllCheck = (event) => {
    setAllChecked((prev) => !prev);

    // 합치기
    let array = new Array(inCart.length).fill({
      checked: event.target.checked,
    });
    array = array.reduce((data, item, index) => {
      data.push({
        checked: item.checked,
        active: checkedState[index].active,
        //price: inCart[index].price,
      });
      return data;
    }, []);
    setCheckedState(array);

    event.target.checked === true
      ? setAllPay((prev) => prev + TotalPrice)
      : setAllPay(0);
  };

  // 전체 삭제 버튼
  const clearAll = () => {
    if (window.confirm('전체 삭제 하시겠습니까?')) {
      dispatch(clearItem());
      setCheckedState([{}]);
    }
  };

  // 조그마한 x(삭제) 버튼
  const removeMonoCheck = (number) => {
    const checkedStateClone = checkedState.reduce((datas, items, index) => {
      if (index === number) {
        datas.push({
          active: items.active === 'block' ? 'none' : 'block',
          checked: false,
        });
      } else {
        datas.push({
          active: items.active,
          checked: items.checked,
        });
      }
      return datas;
    }, []);

    setCheckedState(checkedStateClone);

    //마지막 제품 삭제할때 장바구니 내역 다 지우기
    if (
      checkedStateClone.filter((item) => item.active === 'block').length === 0
    ) {
      dispatch(clearItem());
    }
  };

  // 체크박스
  const handleMonoCheck = (number) => {
    //number : index 번호
    const updatedCheckedState = checkedState.map((item, index) =>
      index === number
        ? {
            checked: !item.checked,
            active: item.active,
          }
        : item,
    );
    setCheckedState(updatedCheckedState);
    const checkedLength = updatedCheckedState.reduce((sum, currentState) => {
      if (currentState.checked === true) {
        return sum + 1;
      }
      return sum;
    }, 0);
    setAllChecked(checkedLength === updatedCheckedState.length);
    setAllPay(
      updatedCheckedState[number].checked
        ? allPay + inCart[number].price * stock[number] // 체크 된 경우
        : allPay - inCart[number].price * stock[number], // 체크 푼 경우
    );
  };

  const complete = () => {
    if (window.confirm('결제를 진행 하시겠습니까?')) {
      setOpacity('0.2');
      setTimeout(() => {
        dispatch(clearItem());
        alert('완료');
        navigate('/');
      }, 1500);
    }
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        margin: '70px auto',
        opacity: { opacity },
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
              onChange={(e) => handleAllCheck(e)}
            />
            <span style={{ margin: '4px' }}>
              전체선택 (
              {checkedState.filter((item) => item.checked === true).length}/
              {checkedState.filter((item) => item.active === 'block').length})
            </span>
          </label>
          <span style={choiceRightMargin50}>|</span>
          <Button
            onClick={() => clearAll()}
            value="전체삭제"
            type="button"
          ></Button>
        </div>
      </div>
      {/* 장바구니 내용 영역*/}
      <div style={items}>
        {checkedState.filter((item) => item.active === 'block').length !== 0 ? ( // 장바구니 데이터가 있을 경우에만
          <>
            <ul style={item}>
              <DataList
                datas={inCart}
                checkHandler={(number) => handleMonoCheck(number)}
                checkedState={checkedState}
                setAllPay={setAllPay}
                allPay={allPay}
                removeMonoCheck={(number) => removeMonoCheck(number)}
                setStock={setStock}
                stock={stock}
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
                onClick={complete}
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
