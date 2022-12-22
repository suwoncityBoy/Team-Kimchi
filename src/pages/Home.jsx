import React from 'react';
import CategoryTitle from '../components/CategoryTitle/CategoryTitle';
import Header from '../components/Header/Header';
import KimchiList from '../components/KimchiList/KimchiList';
//import { useNavigate } from 'react-router-dom';

export default function Home() {
  // const navigate = useNavigate();
  // navigate(``)

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
        <Header />
        <CategoryTitle>배추과 김치</CategoryTitle>
        <KimchiList />

        <CategoryTitle>무과 김치</CategoryTitle>
        <KimchiList />

        <CategoryTitle>뿌리과 김치</CategoryTitle>
        <KimchiList />
      </div>
    </>
  );
}
