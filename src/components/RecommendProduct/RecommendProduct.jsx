import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Kimchi from '../Kimchi/Kimchi';
import { StyledContainer, StyledWrap } from './RecommendProduct.style';

export default function RecommendProduct() {
  const [recommendedProduct, setRecommendedProduct] = useState([]);

  const fetchproduct = async () => {
    const { data } = await axios.get(
      `https://kimchi-json-server.vercel.app/kimchis`,
    );
    // const categorykimchis = data.filter((k)=>{k.category === '배추과김치'} )

    // 상품 추천 랜덤 함수
    const Randomkimchi = [];

    let allKimchis = data;
    for (let i = 0; i < 4; i++) {
      let randomNum = Math.floor(Math.random() * allKimchis.length);
      Randomkimchi.push(allKimchis[randomNum]);
      allKimchis.splice(randomNum, 1);
    }
    setRecommendedProduct(Randomkimchi);
  };

  useEffect(() => {
    fetchproduct();
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
