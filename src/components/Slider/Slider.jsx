import React, { useEffect, useState } from 'react';
import Flim from '../Flim/Flim';
import { BiChevronLeft } from 'react-icons/bi';
import { BiChevronRight } from 'react-icons/bi';
import axios from 'axios';

export default function Slider({ category }) {
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

  const [slidePx, setSlidePx] = useState(0);

  const toPrev = () => {
    if (slidePx < 0) setSlidePx(slidePx + 1375);
  };

  const toNext = () => {
    if (slidePx > -2750) setSlidePx(slidePx - 1375);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* <img src={`${process.env.PUBLIC_URL}${s.image}`} alt="" />
      <p>{s.catergory}</p>
      <h3>{s.name}</h3>
      <p style={{ fontSize: '1rem' }}>{s.price}</p>
      <h4>{s.description}</h4>
      <Button value="입력" type="button"></Button> */}

      <div
        className="prevBtn"
        onClick={toPrev}
        style={{
          display: slidePx === 0 ? 'none' : '',
          position: 'absolute',
          top: '45%',
          left: '0',
          zIndex: '9999',
        }}
      >
        <BiChevronLeft />
      </div>

      <div
        style={{
          display: 'flex',
          width: '100%',
          flexWrap: 'no-wrap',
          padding: '0 5rem',
          boxSizing: 'border-box',
        }}
      >
        {slide
          .filter((s) => s.category === category)
          .map((s) => {
            return <Flim slide={slidePx} key={s.id} s={s} />;
          })}
      </div>

      <div
        className="nextBtn"
        onClick={toNext}
        style={{
          display: slidePx === -2750 ? 'none' : '',
          position: 'absolute',
          top: '45%',
          right: '0',
          zIndex: '9999',
        }}
      >
        <BiChevronRight />
      </div>
    </div>
  );
}
