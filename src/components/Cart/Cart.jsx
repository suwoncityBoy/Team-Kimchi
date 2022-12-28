import { useNavigate } from 'react-router-dom';
import { popItem } from '../../redux/modules/cartSlice';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// 데이터 카테고리별 컴포넌트
export function DataList({
  datas, // 장바구니 데이터들
  checkHandler, //체크박스 처리 핸들러
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
                index={index}
                checkedState={checkedState}
                checkHandler={(index) => checkHandler(index)}
                setAllPay={setAllPay}
                allPay={allPay}
                removeMonoCheck={(number) => removeMonoCheck(number)}
                setStock={setStock}
                count={stock[index]} //
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pop = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      alert('삭제되었습니다.');
      removeMonoCheck(index);
      dispatch(popItem(data));
      setAllPay((prev) => prev - data.price * count);
    } else {
      alert('취소되었습니다.');
      return;
    }
  };

  return (
    <div style={{ display: `${checkedState[index].active}` }}>
      <li
        style={{
          display: 'flex',
          justifyContent: 'space-between',
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
            style={{ webkitTransform: 'scale(2)' }}
          />
        </label>
        <img
          src={data.image}
          style={{ width: '60px', height: '78px', marginRight: '5%' }}
        />
        {/* 상품 이름*/}
        <span
          style={{
            width: '345px',
            textAlign: 'left',
            lineHeight: '1.6rem',
          }}
          onClick={() => navigate(`/kimchis/${data.id}/description`)}
        >
          {data.name}
        </span>
        {/* 주문한 상품 갯수 */}
        <StyledAmountSelect>
          <button
            className="btnMinus"
            disabled={count <= 1 ? true : false}
            onClick={() => {
              // console.log('plus button clicked');
              if (count === 1) {
                alert('최소 수량은 1개 입니다');
              } else {
                setStock((prev) =>
                  prev.map((item, idx) => {
                    if (idx === index) return item - 1;
                    else return item;
                  }),
                );
                setAllPay((pay) => pay - data.price);
              }
            }}
            style={{
              cursor: 'pointer',
            }}
          >
            -
          </button>
          <span className="amount">{count}</span>
          <button
            className="btnPlus"
            onClick={() => {
              // console.log('plus button clicked');
              setStock((prev) =>
                prev.map((item, idx) => {
                  if (idx === index) return item + 1;
                  else return item;
                }),
              );
              setAllPay((pay) => pay + data.price);
            }}
          ></button>
        </StyledAmountSelect>
        주문한 상품의 최종 금액
        <span style={{ marginRight: '1%' }}>{data.price * count}</span>
        <StyledWrap>
          <button className="btnMultiply" onClick={pop}>
            x
          </button>
        </StyledWrap>
      </li>
    </div>
  );
}

const StyledAmountSelect = styled.div`
  display: flex;
  align-items: center;
  height: 35px;

  .btnMinus {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 35px;
    height: 35px;
    border: 1px solid #e3e3e3;
    border-radius: 2px 0px 0px 2px;
    background-color: #f8fafb;
    font-size: 30px;
    text-align: center;
  }
  .amount {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 35px;
    box-sizing: border-box;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    font-weight: 700;
    color: #242424;
  }
  .btnPlus {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border: 1px solid #e3e3e3;
    border-radius: 0px 2px 2px 0px;
    background-color: #f8fafb;
  }
  .btnPlus::before {
    content: '';
    display: block;
    width: 10px;
    height: 2px;
    background-color: black;
  }
  .btnPlus::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 2px;
    height: 10px;
    background-color: black;
    transform: translate(-50%, -50%);
  }
`;
const StyledWrap = styled.div`
  .btnMultiply {
    width: 35px;
    height: 35px;
    border: 1px solid #e3e3e3;
    border-radius: 2px;
    font-size: 15px;
  }
`;
