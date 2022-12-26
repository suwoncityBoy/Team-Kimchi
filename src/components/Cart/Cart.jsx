import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { popItem, minusPrice, plusPrice } from '../../redux/modules/cartSlice';
import { changeChecked } from '../../redux/modules/cartSlice';

// 데이터 카테고리별 컴포넌트
export function DataList({ datas, checkHandler }) {
  if (datas.length) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={`${process.env.PUBLIC_URL}/images/cabbage.png`}></img>
          <span>{datas[0].catergory}</span>
        </div>
        {datas.map((kimchi) => {
          return (
            <div>
              <Data data={kimchi} checkHandler={checkHandler} />
            </div>
          );
        })}
      </>
    );
  }
}

// 데이터 카테고리에 들어가는 데이터
function Data({ data }) {
  const [stock, setStock] = useState(1);

  const dispatch = useDispatch();

  const pop = () => {
    dispatch(popItem(data));
  };
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
      <CheckBox data={data} />
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
            if (stock > 1) {
              setStock(stock - 1);
              dispatch(minusPrice(data.price, stock));
            } else alert('수량은 기본 1개 이상이여야 합니다');
          }}
        >
          -
        </button>
        <span>{stock}</span>
        <button
          onClick={() => {
            setStock(stock + 1);
            dispatch(plusPrice(data.price));
          }}
        >
          +
        </button>
      </div>
      {/* 주문한 상품의 최종 금액 */}
      <span style={{ marginRight: '1%' }}>{data.price * stock}</span>
      <button onClick={pop}>x</button>
    </li>
  );
}

function CheckBox({ data }) {
  const { inCart } = useSelector((state) => state.user); // 장바구니 데이터
  const dispatch = useDispatch();
  // 카트 페이지랑 겹침 나중에 합치기
  const checkHandler = (event) => {
    const checkData = event.target.value;
    for (let i in inCart) {
      if (inCart[i].id === checkData.id) {
        inCart[i].checked = !inCart[i].checked;
        dispatch(changeChecked([...inCart]));
      }
    }
  };

  return (
    <label style={{ width: '24px', height: '24px', marginRight: '2%' }}>
      <input
        type="checkbox"
        checked={data.checked}
        value={data}
        key={data.id}
        onChange={(e) => checkHandler(e)}
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
