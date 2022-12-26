import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function RecommendProduct() {
  const [recommendedProduct, setRecommendedProduct] = useState([]);

  const fetchproduct = async () => {
    const { data } = await axios.get(`http://localhost:3001/kimchis`);
    // const categorykimchis = data.filter((k)=>{k.category === '배추과김치'} )

    // 1. 데이터를 불러온다. : data
    // 2. 랜덤 함수를 사용해서 숫자를 받는다. : number
    // 3. data[number]를 인덱스로 사용한다.
    // 4. 변수에 push하여 data[number]해서 뿌려준다.
    const Randomkimchi = [];

    for (let i = 0; i < 4; i++) {
      let randomNum = Math.floor(Math.random() * data.length) + 1;
      Randomkimchi.push(data[randomNum]);

      // state 배열 -> 참조 값 변경이 되야 리액트가 인지를 한다.
      // 새로운 배열을 만들어야 state가 변경됬다고 인지를 한다. 그래서 map, filter를 사용한다.
    }
    setRecommendedProduct(Randomkimchi);
  };
  console.log(recommendedProduct);

  useEffect(() => {
    fetchproduct();
    //effect 구문에 생성한 함수를 넣어 실행
  }, []);

  return (
    <>
      {/*그 데이터를 렌덤 함수를 사용하여 뿌려준다.*/}
      <div className="recommendation">
        <h3>이 상품 어때요?</h3>

        {recommendedProduct.map((product) => {
          if (recommendedProduct.length > 0) {
            return <div>{product.name}</div>;
          }
        })}
      </div>
    </>
  );
}
