import { useNavigate } from 'react-router-dom';
import { updateTotalCount } from '../../redux/modules/cartSlice';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../utils/constant';

// 데이터 카테고리별 컴포넌트

export function DataList({
  inCart, // 장바구니 데이터 props
  setCheckedItems, // 체크박스 관련 props
  checkedItems, // 체크박스 관련 props
  checkedItemHandler,
  setStock, // 수량 관련 props
  stock, // 수량 관련 props
  setAllPay, // 결제 금액 props
  setInCart,
}) {
  if (inCart.length) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={`${process.env.PUBLIC_URL}/images/cabbage.png`}></img>
          <span>주문목록</span>
        </div>
        {inCart.map((kimchi, index) => {
          return (
            <div>
              <Data
                kimchi={inCart[index]} // 장바구니 데이터 props
                index={index}
                setCheckedItems={setCheckedItems} // 체크박스 관련 props
                checkedItems={checkedItems} // 체크박스 관련 props
                checkedItemHandler={checkedItemHandler}
                setStock={setStock} // 수량 관련 props
                stock={stock[index]} // 수량 관련 props
                setAllPay={setAllPay} // 결제 금액 props
                setInCart={setInCart}
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
  kimchi, // 장바구니에 담았던 데이터
  index, // 장바구니,checkedItems index
  setCheckedItems, // 체크박스
  checkedItems, // 체크박스
  checkedItemHandler, // 체크박스 핸들러
  setStock, // 수량
  stock, // 수량
  setInCart,
  setAllPay, // 결제 금액 props
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pop = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(updateTotalCount(-kimchi.number));
      try {
        await axios.delete(`${SERVER_ADDRESS}/cart/${kimchi.id}`);

        setCheckedItems((prev) =>
          prev.filter((checkBox, checkBoxIndex) => {
            if (index !== checkBoxIndex) {
              return checkBox;
            }
          }),
        );
        setInCart((prev) =>
          prev.filter((data, dataIndex) => {
            if (index !== dataIndex) {
              return data;
            }
          }),
        );

        setAllPay((prev) => prev - kimchi.price * stock);
        alert('삭제되었습니다.');
      } catch (e) {
        alert('서버 오류');
      }
    } else {
      alert('취소되었습니다.');
      return;
    }
  };

  return (
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
          checked={checkedItems[index]}
          key={index}
          onChange={() => checkedItemHandler(index)}
          style={{ webkitTransform: 'scale(2)' }}
        />
      </label>
      <img
        src={kimchi.image}
        style={{ width: '60px', height: '78px', marginRight: '5%' }}
      />
      {/* 상품 이름*/}
      <span
        style={{
          width: '345px',
          textAlign: 'left',
          lineHeight: '1.6rem',
        }}
        onClick={() => navigate(`/kimchis/${kimchi.id}/description`)}
      >
        {kimchi.name}
      </span>
      {/* 주문한 상품 갯수 */}
      <StyledAmountSelect>
        <button
          className="btnMinus"
          disabled={stock <= 1 ? true : false}
          onClick={() => {
            // console.log('plus button clicked');
            if (stock === 1) {
              alert('최소 수량은 1개 입니다');
            } else {
              setStock((prev) =>
                prev.map((stockItem, stockItemIdx) => {
                  if (stockItemIdx === index) return stockItem - 1;
                  else return stockItem;
                }),
              );
              setAllPay((pay) => pay - kimchi.price);
            }
          }}
          style={{
            cursor: 'pointer',
          }}
        >
          -
        </button>
        <span className="amount">{stock}</span>
        <button
          className="btnPlus"
          onClick={() => {
            setStock((prev) =>
              prev.map((stockItem, stockItemIdx) => {
                if (stockItemIdx === index) return stockItem + 1;
                else return stockItem;
              }),
            );
            setAllPay((pay) => pay + kimchi.price);
          }}
          style={{
            cursor: 'pointer',
          }}
        ></button>
      </StyledAmountSelect>
      주문한 상품의 최종 금액
      <span style={{ marginRight: '1%' }}>{kimchi.price * stock}</span>
      <StyledWrap>
        <button
          className="btnMultiply"
          onClick={pop}
          style={{
            cursor: 'pointer',
          }}
        >
          x
        </button>
      </StyledWrap>
    </li>
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
