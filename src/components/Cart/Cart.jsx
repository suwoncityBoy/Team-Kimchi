import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { popItem, minusPrice, plusPrice } from '../../redux/modules/cartSlice';
import { changeChecked } from '../../redux/modules/cartSlice';

// 데이터 카테고리별 컴포넌트
export function DataList({
  datas, // 장바구니 데이터들
  checkHandler, //체크박스
  checkedState, //체크박스
  setAllPay, // 총 금액
  allPay, // 총 금액
  removeMonoCheck, // 데이터 삭제
  setStock, // 갯수
  stock, // 갯수
}) {
  if (datas.length) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={`${process.env.PUBLIC_URL}/images/cabbage.png`}></img>
          <span>주문목록</span>
        </div>
        {datas.map((kimchi, index) => {
          return (
            <div>
              <Data
                data={kimchi} // 데이터
                checkHandler={(index) => checkHandler(index)}
                index={index}
                checkedState={checkedState}
                setAllPay={setAllPay}
                allPay={allPay}
                removeMonoCheck={(number) => removeMonoCheck(number)}
                setStock={setStock}
                count={stock[index]}
              />
            </div>
          );
        })}
      </>
    );
  }
}

// 데이터 카테고리에 들어가는 데이터
function Data({
  data, // 김치 데이터
  index, // 장바구니 리스트 인덱스
  checkHandler, // 체크박스 핸들러
  checkedState, // 체크박스 state
  setAllPay, // 전체 금액
  allPay, // 전체 금액
  removeMonoCheck, // 데이터 삭제 버튼
  setStock, // 갯수
  count, // 갯수
}) {
  //const dispatch = useDispatch();

  const pop = () => {
    removeMonoCheck(index);
    //dispatch(popItem(data));
    setAllPay(allPay - data.price);
  };

  return (
    <div style={{ display: `${checkedState[index].active}` }}>
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
          <input
            type="checkbox"
            checked={checkedState[index].checked}
            key={index}
            onChange={() => checkHandler(index)}
          />
        </label>
        <img
          src={data.image}
          style={{ width: '60px', height: '78px', marginRight: '5%' }}
        />
        {/* 상품 이름*/}
        <span style={{ marginRight: '20%' }}>{data.name}</span>
        {/* 주문한 상품 갯수 */}
        <div style={{ marginRight: '5%' }}>
          <button
            onClick={() => {
              if (count > 1) {
                // setStock(count - 1);
                // setAllPay(allPay - data.price);
                //dispatch(minusPrice(data.price));
              } else alert('수량은 기본 1개 이상이여야 합니다');
            }}
          >
            -
          </button>
          <span>{count}</span>
          <button
            onClick={() => {
              setStock((prev) => {
                prev.map((stockItem, idx) => {
                  if (idx === index) {
                    return stockItem + 1;
                  } else {
                    return stockItem;
                  }
                });
              });
              console.log('ssss>>>>>');
              setAllPay(allPay + data.price);
            }}
          >
            +
          </button>
        </div>
        {/* 주문한 상품의 최종 금액 */}
        {/* <span style={{ marginRight: '1%' }}>{data.price * }</span> */}
        <button onClick={pop}>x</button>
      </li>
    </div>
  );
}
