import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SERVER_ADDRESS } from '../../utils/constant';

export default function DetailImage() {
  const { id } = useParams();
  const [imgPath, setImgPath] = useState('');
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  // 경로에 따라 상품설명/레시피 이미지 구분
  let imgName = '';
  if (pathname.endsWith('description')) {
    imgName = 'detail-image';
  } else if (pathname.endsWith('recipe')) {
    imgName = 'recipe-image';
  }

  // db.json에서 상품설명 이미지 경로 받아오는 함수
  const getImgPath = async () => {
    setLoading(true);
    const response = await axios.get(`${SERVER_ADDRESS}/kimchis/${id}`);
    const data = response.data[imgName];
    setImgPath(data);
    setLoading(false);
  };

  useEffect(() => {
    getImgPath();
  }, [pathname]);

  return (
    <div style={{ minHeight: '300px' }}>
      {loading || (
        <img
          src={process.env.PUBLIC_URL + imgPath}
          style={{
            padding: '10px',
            width: '100%',
            maxWidth: '1010px',
            boxSizing: 'border-box',
          }}
          alt="img"
        />
      )}
    </div>
  );
}
