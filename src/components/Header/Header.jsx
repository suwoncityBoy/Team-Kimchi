import React from 'react';

export default function Header() {
  return (
    <div style={{ width: '100%', marginBottom: '2rem' }}>
      <img
        src={`${process.env.PUBLIC_URL}/images/Banner.png`}
        style={{ width: '100%' }}
        alt="banner"
      />
    </div>
  );
}
