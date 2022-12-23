import React from 'react';
import { useParams } from 'react-router-dom';

// export default function Recipe({ imgPath }) {
//   return (
//     <img
//       src={process.env.PUBLIC_URL + imgPath}
//       style={{ width: '100%' }}
//       alt="img"
//     />
//   );
// }
export default function Recipe() {
  const { id } = useParams();
  console.log(id);

  return (
    <img
      src={process.env.PUBLIC_URL + '/images/product/kimchi_1-recipe.png'}
      style={{ width: '100%' }}
      alt="img"
    />
  );
}
