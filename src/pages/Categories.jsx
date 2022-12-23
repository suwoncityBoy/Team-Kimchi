import React from 'react';
import CategoryTitle from '../components/CategoryTitle/CategoryTitle';
import KimchiList from '../components/KimchiList/KimchiList';

export default function Categories() {
  return (
    <>
      <div
        style={{
          fontSize: '40px',
          wordWrap: 'none',
          width: '100%',
          marginBottom: '3rem',
        }}
      >
        <CategoryTitle>배추과 김치</CategoryTitle>
        <KimchiList />
        <KimchiList />
        <KimchiList />
      </div>
    </>
  );
}
