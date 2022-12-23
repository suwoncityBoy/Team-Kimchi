import React from 'react';
import { useParams } from 'react-router-dom';

// export default function Description({ imgPath }) {
//   return (
//     <img
//       src={process.env.PUBLIC_URL + imgPath}
//       style={{ width: '100%' }}
//       alt="img"
//     />
//   );
// }
export default function Description() {
  const { id } = useParams();
  console.log(id);

  return (
    <img
      src={process.env.PUBLIC_URL + '/images/product/kimchi_1-detail.png'}
      style={{ width: '100%' }}
      alt="img"
    />
  );
}
