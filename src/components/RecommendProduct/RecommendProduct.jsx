import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Kimchi from '../Kimchi/Kimchi';
import { StyledContainer, StyledWrap } from './RecommendProduct.style';
import { SERVER_ADDRESS } from '../../utils/constant';

export default function RecommendProduct() {
  const [recommendedProduct, setRecommendedProduct] = useState([]);

  const fetchproduct = async () => {
    const { data } = await axios.get(`${SERVER_ADDRESS}/kimchis`);
    // const categorykimchis = data.filter((k)=>{k.category === '배추과김치'} )

    // 1. 데이터를 불러온다. : data
    // 2. 랜덤 함수를 사용해서 숫자를 받는다. : number
    // 3. data[number]를 인덱스로 사용한다.
    // 4. 변수에 push하여 data[number]해서 뿌려준다.
    let Randomkimchi = [];

    let allKimchis = data;
    for (let i = 0; i < 4; i++) {
      let randomNum = Math.floor(Math.random() * allKimchis.length);
      Randomkimchi.push(allKimchis[randomNum]);
      allKimchis.splice(randomNum, 1);
    }
    setRecommendedProduct(Randomkimchi);
  };

  console.log(recommendedProduct);

  useEffect(() => {
    fetchproduct();
    //effect 구문에 생성한 함수를 넣어 실행
  }, []);

  return (
    <StyledContainer>
      <h1>이 상품 어때요?</h1>
      <StyledWrap>
        {recommendedProduct.map((k) => {
          if (recommendedProduct.length > 0) {
            return <Kimchi k={k} />;
          }
        })}
      </StyledWrap>
    </StyledContainer>
  );
}
