import React from 'react';
import Kimchi from '../Kimchi/Kimchi';

export default function KimchiList() {
  return (
    <div
      style={{
        display: 'flex',
        padding: '0 2rem',
        justifyContent: 'space-between',
      }}
    >
      <Kimchi />
      <Kimchi />
      <Kimchi />
      <Kimchi />
    </div>
  );
}
