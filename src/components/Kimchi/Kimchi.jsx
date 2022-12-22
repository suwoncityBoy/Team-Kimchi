import React from 'react';

export default function Kimchi() {
  return (
    <div
      style={{
        width: '21%',
        height: '21%',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
          overflow: 'hidden',
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/images/kimchi_img1.jpg`}
          style={{
            position: 'absolute',
            top: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="dec" style={{ margin: '1rem 0 1.4rem' }}>
        <h2
          style={{
            fontSize: '1.2rem',
            fontWeight: '500',
            marginBottom: '0.5rem',
          }}
        >
          김치 이름
        </h2>
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1.3rem',
            color: '#393838',
          }}
        >
          8,000원
        </h3>
        <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#666' }}>
          맛있어 김치...
        </p>
      </div>
    </div>
  );
}
