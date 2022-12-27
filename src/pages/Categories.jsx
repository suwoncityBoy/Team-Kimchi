import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import CategoryTitle from '../components/CategoryTitle/CategoryTitle';
import Kimchi from '../components/Kimchi/Kimchi';
import './Categories-style.css';

export default function Categories() {
  const location = useLocation();
  const [kimchi, setKimchi] = useState([]);

  // categories page tab 구현(Categories-style.css Page도 그것 때문에 있는것)
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabClickHandler2 = (index) => {
    setActiveIndex2(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? 'isActive' : 'title'}
          onClick={() => tabClickHandler(0)}
        >
          <Link to="/categories/배추과김치" style={{ textDecoration: 'none' }}>
            <p
              className={activeIndex2 === 0 ? 'isactive' : 'titleP'}
              onClick={() => tabClickHandler2(0)}
              style={{
                fontSize: '1.2rem',
                margin: '0  2rem ',
                paddingBottom: '1rem',
              }}
            >
              배추과 김치
            </p>
          </Link>
        </li>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? 'isActive' : 'title'}
          onClick={() => tabClickHandler(1)}
        >
          <Link to="/categories/무과김치" style={{ textDecoration: 'none' }}>
            <p
              className={activeIndex2 === 1 ? 'isactive' : 'titleP'}
              onClick={() => tabClickHandler2(1)}
              style={{
                fontSize: '1.2rem',
                margin: '0 2rem',
                paddingBottom: '1rem',
              }}
            >
              무과 김치
            </p>
          </Link>
        </li>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 2 ? 'isActive' : 'title'}
          onClick={() => tabClickHandler(2)}
        >
          <Link to="/categories/뿌리과김치" style={{ textDecoration: 'none' }}>
            <p
              className={activeIndex2 === 2 ? 'isactive' : 'titleP'}
              onClick={() => tabClickHandler2(2)}
              style={{
                fontSize: '1.2rem',
                margin: '0 2rem',
                paddingBottom: '1rem',
              }}
            >
              뿌리과 김치
            </p>
          </Link>
        </li>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 3 ? 'isActive' : 'title'}
          onClick={() => tabClickHandler(3)}
        >
          <Link to="/categories/기타김치" style={{ textDecoration: 'none' }}>
            <p
              className={activeIndex2 === 3 ? 'isactive' : 'titleP'}
              onClick={() => tabClickHandler2(3)}
              style={{
                fontSize: '1.2rem',
                margin: '0 2rem',
                paddingBottom: '1rem',
              }}
            >
              기타 김치
            </p>
          </Link>
        </li>
      ),
    },
  ];

  const fetchKimchi = async () => {
    const { data } = await axios.get(
      'https://kimchi-json-server.vercel.app/kimchis',
    );
    console.log('data', data);
    setKimchi(data);
    // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
  };

  useEffect(() => {
    //effect 구문에 생성한 함수를 넣어 실행합니다.

    fetchKimchi();
  }, []);

  console.log(kimchi);

  const paramID = useParams().id;
  // const [categoryName, setCategoryName] = useState("");
  // switch(paramID) {
  //   case "1" :
  //     setCategoryName("배추과김치")

  //   default:
  //     return
  // }

  // const test = paramID ? true : false;
  console.log(paramID);

  return (
    <>
      {/* <div
        className="menu"
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '2rem 0',
        }}
      >

      </div> */}

      <div>
        <ul
          className="tabs is-boxed"
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '3rem 0 0 0',
          }}
        >
          {tabContArr.map((section, index) => {
            return section.tabTitle;
          })}
        </ul>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <CategoryTitle>{decodeURI(location.pathname.slice(12))}</CategoryTitle>
      </div>

      <div
        style={{
          fontSize: '40px',
          wordWrap: 'none',
          width: '100%',
          marginBottom: '3rem',
        }}
      >
        {/* {kimchi.map((k) => {
          if (paramID === k.categoryID) {
            return (
              <div>
                <h1>{k.catergory}</h1>
                <p>{k.name}</p>
              </div>
            );
          }
        })} */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            padding: '0 4rem',
          }}
        >
          {kimchi.map((k) => {
            console.log(paramID, k.category);
            if (paramID === k.category) {
              return <Kimchi k={k} />;
            } else {
              return null;
            }
          })}
        </div>
      </div>

      <div></div>
    </>
  );
}
