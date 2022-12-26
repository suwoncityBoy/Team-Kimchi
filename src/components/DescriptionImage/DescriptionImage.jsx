import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Description() {
  const { id } = useParams();
  const [imgPath, setImgPath] = useState('');

  // db.json에서 상품설명 이미지 경로 받아오는 함수
  const getImgPath = async () => {
    const response = await axios.get(`http://localhost:3001/kimchis/${id}`);
    const data = response.data['detail-image'];
    setImgPath(data);
  };

  useEffect(() => {
    getImgPath();
  });

  return (
    <img
      src={process.env.PUBLIC_URL + imgPath}
      style={{ padding: '10px', width: '100%', boxSizing: 'border-box' }}
      alt="img"
    />
  );
}
