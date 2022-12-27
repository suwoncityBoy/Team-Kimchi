import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { SlBasket } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { DataList, CheckBoxList } from '../components/Cart/Cart';
import { changeChecked } from '../redux/modules/cartSlice';
import { popItem, clearItem } from '../redux/modules/cartSlice';
//import { CiCircleCheck } from 'react-icons/ci';

export default function Cart() {
  // const navigate = useNavigate();
  // navigate(``)
  const { inCart, totalSum } = useSelector((state) => state.user); // 장바구니 데이터
  // const { lastSum } = useSelector((state) => state.user); // 장바구니 데이터
  const [sum, setSum] = useState(totalSum);
  const [checked, setChecked] = useState(true);

  //const [lastSum, setLastSum] = useState(totalSum);
  const kindCabbage = inCart.filter(
    (kimchis) => kimchis.category === '배추과김치',
  ); // 배추과김치 데이터
  const kindRadish = inCart.filter(
    (kimchis) => kimchis.category === '무과김치',
  ); // 무과김치 데이터
  const kindRoot = inCart.filter(
    (kimchis) => kimchis.category === '뿌리과김치',
  ); // 무과김치 데이터
  const kindEtc = inCart.filter((kimchis) => kimchis.category === '기타김치'); // 무과김치 데이터

  // const [isAllChecked, setIsAllChecked] = useState(
  //   inCart.filter((kimchis) => kimchis.checked === true).length ===
  //     inCart.length
  //     ? true
  //     : false,
  // );

  const issues = [...inCart]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  // const [isAllChecked, setIsAllChecked] = useState(true);
  // const [checkedItems, setCheckedItems] = useState(issues);
  // const [checkedItem, setCheckedItem] = useState(new Set());

  // const allCheckedHandler = (event) => {
  //   if (event.target.checked) {
  //     setCheckedItems(issues.map((item) => item));
  //     setIsAllChecked(true);
  //   } else {
  //     setCheckedItems(checkedItems ?? []);
  //     //setCheckedItems(setCheckedItems);
  //     setIsAllChecked(false);
  //   }
  // };

  // const checkedItemHandler = (id, isChecked) => {
  //   if (isChecked) {
  //     checkedItem.add(id);
  //     setCheckedItems(checkedItem);
  //   } else if (
  //     !isChecked &&
  //     checkedItems.filter((item) => item.id === id).length !== 0
  //   ) {
  //     setCheckedItems(checkedItems.filter((item) => item.id !== id));
  //     setIsAllChecked(false);
  //   }
  // };

  const [allPay, setAllPay] = useState(
    inCart.reduce((sum, kimchi) => {
      return sum + kimchi.price;
    }, 0),
  );
  const [thisPay, setThisPay] = useState(
    new Array(inCart.length).fill([{ ...inCart.price }]),
  );

  const [stock, setStock] = useState(new Array(inCart.length).fill(1));

  const [isAllChecked, setAllChecked] = useState(true);
  const [checkedState, setCheckedState] = useState(
    new Array(inCart.length).fill({ checked: true, active: 'block', price: 0 }),
  );
  useEffect(() => {
    console.log(stock);
  }, [stock]);

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

    const sum = inCart.reduce((sum, kimchi) => {
      if (kimchi.checked) {
        return sum + kimchi.price;
      }
      //return sum + kimchi.price;
    }, 0);
    event.target.checked === true ? setAllPay(sum) : setAllPay(0);
    // isAllChecked === true
    //   ? setAllPay(
    //       inCart.reduce((sum, kimchi) => {
    //         return sum + kimchi.price;
    //       }, 0),
    //     )
    //   : setAllPay(0);
  };

  const clearAll = () => {
    dispatch(clearItem());
    setCheckedState([{}]);
  };

  const removeMonoCheck = (number) => {
    //const checkedStateClone = [...checkedState];
    // for (let i in checkedStateClone) {
    //   if (i * 1 === number) {
    //     checkedStateClone[number].active =
    //       checkedStateClone[number].active === 'block' ? 'none' : 'block';
    //   }
    // }
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
      clearAll();
    }
  };
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

    // const datas = [...inCart];
    // for (let i in datas) {
    //   if (i * 1 === number) {
    //     datas[i].checked = event.target.checked;
    //   }
    // }
    // setAllPay(allPay - inCart[number].price);
    //console.log(inCart[number].price);
  };

  const dispatch = useDispatch();

  // 처음부터 모든 체크박스에 체크가 되어있는 상황임.
  // 체크를 하나라도 풀었을때 -> 전체체크박에 체크된거 풀기 :
  // => 메소드를 만들어야할듯, isChecked 상태가 false 로 바뀌면 isAllChecked 도 false로 바뀌어야함
  // let sums = 0;
  // const allCheckHandler = () => {
  //   const arrData = [...inCart];
  //   let isCheck;
  //   for (let i in arrData) {
  //     const data = { ...arrData[i] };
  //     data.checked = !isAllChecked;
  //     isCheck = !isAllChecked;

  //     arrData[i] = data;
  //   }
  //   setSum(isCheck === true ? totalSum : 0);
  //   dispatch(changeChecked(arrData));
  //   setIsAllChecked(!isAllChecked);
  // };

  // 모두다 체크 되었을때 -> 전체체크박스에 체크 하기
  //

  // 체크박스
  // const [checkedItem, setCheckedItem] = useState(inCart); // 전체 체크박스 관리
  // const [isAllChecked, setIsAllChecked] = useState(true); // 전체 선택 관리

  // const checkHandler = (data, isChecked) => {
  //   // 개별 체크 박스 관리 메소드
  //   if (isChecked) {
  //     setCheckedItem([...checkedItem, data]);

  //     if (checkedItem.length === inCart.length) {
  //       setIsAllChecked(true);
  //     }
  //   } else {
  //     //오모 이렇게두 되네,,
  //     setCheckedItem([...checkedItem.filter((item) => item.id !== data.id)]);
  //     setIsAllChecked(false);
  //   }
  // };

  // const allCheck = () => {
  //   // 전체 체크 박스 관리 메소드
  //   setIsAllChecked(true);
  // };

  // 선택삭제

  // 수량 갯수

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
          <input
            type="checkbox"
            style={choiceRightMargin10}
            checked={isAllChecked}
            onChange={(e) => handleAllCheck(e)}
          />
          <span>
            전체선택 (
            {checkedState.filter((item) => item.checked === true).length}/
            {checkedState.filter((item) => item.active === 'block').length})
          </span>
        </label>
        <span style={choiceRightMargin30}>|</span>
        <button onClick={() => clearAll()}>전체삭제</button>
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
