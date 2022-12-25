import React from 'react';
import CategoryTitle from '../components/CategoryTitle/CategoryTitle';
import Header from '../components/Header/Header';
//import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Slider from '../components/Slider/Slider';

export default function Home() {
  //const navigate = useNavigate();

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
        {/* <CategoryTitle>배추과 김치</CategoryTitle>
        <KimchiList />

        <CategoryTitle>무과 김치</CategoryTitle>
        <KimchiList />

        <CategoryTitle>뿌리과 김치</CategoryTitle>
        <KimchiList /> */}

        <CategoryTitle>배추과 김치</CategoryTitle>

        <Slider category="배추과김치" />

        <CategoryTitle>뿌리과 김치</CategoryTitle>

        <Slider category="뿌리과김치" />

        <CategoryTitle>무과 김치</CategoryTitle>

        <Slider category="무과김치" />

        <CategoryTitle>기타 김치</CategoryTitle>

        <Slider category="기타김치" />

        {/*{slide
          .filter((s) => s.category === '배추과김치')
          .map((s) => {
            return (
              <ul
               onClick={() => {
                 navigate(`/kimchis/${s.id}`);
               }}
              >
                <li>
                 <Link to={`/kimchis/${s.id}`}>
                  <Slider s={s} />
                  </Link>
                </li>
              </ul>
            );
          })}*/}
      </div>
    </>
  );
}
