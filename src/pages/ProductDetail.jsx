import React, { useState } from 'react';

export default function ProductDetail() {
  const [count, setCount] = useState(0);

  const minusHandler = () => {
    if (count <= 0) return count;
    setCount(count - 1);
  };
  const plusHandler = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div
        style={{
          height: '80%',
          backgroundColor: 'yellowgreen',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'red',
            width: '90%',
            height: '90%',
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              height: '90%',
              width: '50%',
            }}
          >
            <img
              src="https://img.etoday.co.kr/pto_db/2020/11/600/20201126091736_1545518_1200_1333.jpg"
              style={{ maxWidth: '100%', height: '100%' }}
            ></img>
          </div>

          <div
            style={{
              position: 'relative',
              backgroundColor: 'yellow',
              height: '90%',
              width: '50%',
            }}
          >
            <div style={{ lineHeight: '2.2', marginTop: '100px' }}>
              <p style={{ fontSize: '40px' }}>[종가집]하루세끼 맛김치</p>
              <p style={{ fontSize: '25px' }}>손질없이 어디서나 간편하게</p>
              <h1 style={{ fontSize: '40px' }}>3900 원</h1>
            </div>

            <div style={{ display: 'flex', marginTop: '80px' }}>
              <p style={{ fontSize: '25px', width: '20%', paddingTop: '20px' }}>
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
                    <button onClick={minusHandler}>-</button>
                    <span>{count}</span>
                    <button onClick={plusHandler}>+</button>
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
        </div>
      </div>
    </>
  );
}