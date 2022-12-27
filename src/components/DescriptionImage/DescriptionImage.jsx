import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../utils/constant';

export default function Description() {
  const { id } = useParams();
  const [imgPath, setImgPath] = useState('');

  // db.json에서 상품설명 이미지 경로 받아오는 함수
  const getImgPath = async () => {
    const response = await axios.get(`${SERVER_ADDRESS}/kimchis/${id}`);
    const data = response.data['detail-image'];
    setImgPath(data);
  };

  useEffect(() => {
    getImgPath();
  });

  return (
    <img
      src={process.env.PUBLIC_URL + imgPath}
      style={{
        padding: '10px',
        width: '100%',
        maxWidth: '1010px',
        boxSizing: 'border-box',
        minHeight: '1000px',
      }}
      alt="img"
    />
  );
}
