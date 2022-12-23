import React from 'react';

export default function Slider({ s }) {
  return (
    <div>
      <img src={`${process.env.PUBLIC_URL}${s.image}`} alt="" />
      <p>{s.catergory}</p>
      <h3>{s.name}</h3>
      <p>{s.price}</p>
      <h4>{s.description}</h4>
    </div>
  );
}
