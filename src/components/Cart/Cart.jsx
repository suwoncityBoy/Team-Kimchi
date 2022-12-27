import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { popItem, minusPrice, plusPrice } from '../../redux/modules/cartSlice';
import { changeChecked } from '../../redux/modules/cartSlice';

// 데이터 카테고리별 컴포넌트
export function DataList({
  datas,
  checkHandler,
  checkedState,
  setAllPay,
  allPay,
  removeMonoCheck,
  setStock,
  stock,
}) {
  console.log(stock);
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
                data={kimchi}
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
  data,
  checkHandler,
  index,
  checkedState,
  setAllPay,
  allPay,
  removeMonoCheck,
  setStock,
  count,
}) {
  const dispatch = useDispatch();

  // const { inCart } = useSelector((state) => state.user); // 장바구니 데이터

  // const kimchi = [...inCart].filter(
  //   (kimchis) => kimchis.id === data.id && kimchis.category === data.category,
  // )[0];

  // const checkedItemHandler = (id, isChecked) => {
  //   if (isChecked) {
  //     checkedItems.add(id);
  //     setCheckedItems(checkedItems);
  //   } else if (!isChecked && checkedItems.has(id)) {
  //     checkedItems.delete(id);
  //     setCheckedItems(checkedItems);
  //   }
  // };

  // const allCheckHandler = () => setChecked(isAllChecked);

  // useEffect(() => allCheckHandler(), [isAllChecked]);

  // const [bChecked, setBChecked] = useState(false);

  // const checkHandler = ({ target }) => {
  //   setBChecked(!bChecked);
  //   pCheckHandler(data.id, target.checked);
  // };

  // const allCheckHandler = () => setBChecked(isAllChecked);

  // useEffect(() => allCheckHandler(), [isAllChecked]);
  // const theKimchi = { ...data };
  // theKimchi.checked = !theKimchi.checked;

  // 카트 페이지랑 겹침 나중에 합치기
  // const checkHandler = () => {
  //   // 체크 박스를 누른 경우
  //   const arrData = [...inCart];
  //   for (let i in arrData) {
  //     if (arrData[i].id === kimchi.id) {
  //       const data = { ...arrData[i] };
  //       data.checked = !kimchi.checked;
  //       arrData[i] = data;
  //     }
  //   }

  //   dispatch(changeChecked(arrData));
  //   dispatch(
  //     !kimchi.checked
  //       ? plusPrice(kimchi.price * stock)
  //       : minusPrice(kimchi.price * stock),
  //   );
  //   //setIsChecked(!isChecked);
  // };

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

function CheckBox({ data }) {
  const { inCart } = useSelector((state) => state.user); // 장바구니 데이터

  const kimchi = [...inCart].filter(
    (kimchis) => kimchis.id === data.id && kimchis.category === data.category,
  )[0];

  const dispatch = useDispatch();

  // const theKimchi = { ...data };
  // theKimchi.checked = !theKimchi.checked;

  // 카트 페이지랑 겹침 나중에 합치기
  const checkHandler = () => {
    const arrData = [...inCart];
    for (let i in arrData) {
      if (arrData[i].id === kimchi.id) {
        const data = { ...arrData[i] };
        data.checked = !kimchi.checked;
        arrData[i] = data;
      }
    }

    dispatch(changeChecked(arrData));
    dispatch(
      !kimchi.checked ? plusPrice(kimchi.price) : minusPrice(kimchi.price),
    );
    //setIsChecked(!isChecked);
  };

  return (
    <label style={{ width: '24px', height: '24px', marginRight: '2%' }}>
      <input
        type="checkbox"
        checked={kimchi.checked}
        key={data.id}
        onChange={checkHandler}
      />
    </label>
  );
}

// export function CheckBoxList({datas}) {

//   const [isCheckAll, setIsCheckAll] = useState(false); // 전체체크 상태 관리
//   const [isChecking, setIsChecking] = useState(false); // 체크한 항목이 하나라도 있을경우를 관리
//   const [arrChecked, setArrChecked] = useState(datas); // 체크된 항목을 관리

//   const changeAllCheck = (event) => {
//     if (event.target.checked) {
//       setIsCheckAll(true); //전체 체크
//     } else {
//       setIsChecking(false);
//       setArrChecked([]);
//     }
//     const checkingCheckedBos = () => {
//       setIsCheckAll(false);
//       setIsChecking(true);
//       setArrChecked([]);
//     };
//   };
//   return (
//     <input
//       type="checkbox"
//       style={choiceRightMargin10}
//       //onClick={pop}
//       checked
//     />
//   );
// }
