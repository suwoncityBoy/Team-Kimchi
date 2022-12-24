import React, { useEffect, useState } from 'react';
import CategoryTitle from '../components/CategoryTitle/CategoryTitle';
import Header from '../components/Header/Header';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from '../components/Slider/Slider';

export default function Home() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState([]);

  const fetchSlide = async () => {
    const { data } = await axios.get('http://localhost:3003/kimchis');
    setSlide(data);
    // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
  };

  useEffect(() => {
    //effect 구문에 생성한 함수를 넣어 실행합니다.
    fetchSlide();
  }, []);

  console.log(slide);

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
        {slide
          .filter((s) => s.category === '배추과김치')
          .map((s) => {
            return (
              <ul
                onClick={() => {
                  navigate(`/kimchis/${s.id}`);
                }}
              >
                <li>
                  {/* <Link to={`/kimchis/${s.id}`}> */}
                  <Slider s={s} />
                  {/* </Link> */}
                </li>
              </ul>
            );
          })}

        <CategoryTitle>무과 김치</CategoryTitle>
        {slide
          .filter((s) => s.category === '무과김치')
          .map((s) => {
            return (
              <ul
                onClick={() => {
                  navigate(`/kimchis/${s.id}`);
                }}
              >
                <li>
                  {/* <Link to={`/kimchis/${s.id}`}> */}
                  <Slider s={s} />
                  {/* </Link> */}
                </li>
              </ul>
            );
          })}

        <CategoryTitle>뿌리과 김치</CategoryTitle>
        {slide
          .filter((s) => s.category === '뿌리과김치')
          .map((s) => {
            return (
              <ul
                onClick={() => {
                  navigate(`/kimchis/${s.id}`);
                }}
              >
                <li>
                  {/* <Link to={`/kimchis/${s.id}`}> */}
                  <Slider s={s} />
                  {/* </Link> */}
                </li>
              </ul>
            );
          })}

        <CategoryTitle>기타 김치</CategoryTitle>
        {slide
          .filter((s) => s.category === '기타김치')
          .map((s) => {
            return (
              <ul
                onClick={() => {
                  navigate(`/kimchis/${s.id}`);
                }}
              >
                <li>
                  {/* <Link to={`/kimchis/${s.id}`}> */}
                  <Slider s={s} />
                  {/* </Link> */}
                </li>
              </ul>
            );
          })}
      </div>
    </>
  );
}
