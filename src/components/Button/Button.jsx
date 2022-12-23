import React from 'react';

export default function Button({ className, value, type }) {
  return (
    <button type={type} className={className}>
      {value}
    </button>
  );
}
