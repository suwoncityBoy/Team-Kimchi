import React, { useEffect, useState } from 'react';
import CategoryTitle from '../components/CategoryTitle/CategoryTitle';
import Header from '../components/Header/Header';
//import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slide.css';
import Kimchi2 from '../components/Kimchi2/Kimchi2';

export default function Home() {
  const [slide, setSlide] = useState([]);

  const fetchSlide = async () => {
    const { data } = await axios.get('http://localhost:3001/kimchis');
    setSlide(data);
    // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
  };

  useEffect(() => {
    //effect 구문에 생성한 함수를 넣어 실행합니다.
    fetchSlide();
  }, []);

  // console.log(slide);

  //const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

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

        <div>
          <div
            style={{
              width: 'calc(100vw - 172px)',
              padding: '0 2rem',
              boxSizing: 'border-box',
              marginBottom: '4rem',
            }}
          >
            <CategoryTitle>배추과 김치</CategoryTitle>
            <Slider {...settings} style={{ width: '100%' }}>
              {slide
                .filter((k) => k.category === '배추과김치')
                .map((k) => {
                  return (
                    <ul>
                      <li>
                        <Kimchi2 k={k} />
                      </li>
                    </ul>
                  );
                })}
            </Slider>
          </div>

          <div
            style={{
              width: 'calc(100vw - 172px)',
              padding: '0 2rem',
              boxSizing: 'border-box',
              marginBottom: '4rem',
            }}
          >
            <CategoryTitle>무과 김치</CategoryTitle>
            <Slider {...settings} style={{ width: '100%' }}>
              {slide
                .filter((k) => k.category === '무과김치')
                .map((k) => {
                  return (
                    <ul>
                      <li>
                        <Kimchi2 k={k} />
                      </li>
                    </ul>
                  );
                })}
            </Slider>
          </div>

          <div
            style={{
              width: 'calc(100vw - 172px)',
              padding: '0 2rem',
              boxSizing: 'border-box',
              marginBottom: '4rem',
            }}
          >
            <CategoryTitle>뿌리과 김치</CategoryTitle>
            <Slider {...settings} style={{ width: '100%' }}>
              {slide
                .filter((k) => k.category === '뿌리과김치')
                .map((k) => {
                  return (
                    <ul>
                      <li>
                        <Kimchi2 k={k} />
                      </li>
                    </ul>
                  );
                })}
            </Slider>
          </div>

          <div
            style={{
              width: 'calc(100vw - 172px)',
              padding: '0 2rem',
              boxSizing: 'border-box',
              marginBottom: '4rem',
            }}
          >
            <CategoryTitle>기타 김치</CategoryTitle>
            <Slider {...settings} style={{ width: '100%' }}>
              {slide
                .filter((k) => k.category === '기타김치')
                .map((k) => {
                  return (
                    <ul>
                      <li>
                        <Kimchi2 k={k} />
                      </li>
                    </ul>
                  );
                })}
            </Slider>
          </div>
        </div>
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
