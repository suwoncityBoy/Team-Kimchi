import React from 'react';

export default function CategoryTitle({ children }) {
  return (
    <div
      style={{
        padding: '3.6rem 0 2.6rem',
        textAlign: 'center',
        fontSize: '1.6rem',
        fontWeight: '500',
      }}
    >
      {children}
    </div>
  );
}
