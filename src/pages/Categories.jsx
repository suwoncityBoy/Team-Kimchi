import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function Categories() {
  const [kimchi, setKimchi] = useState([]);

  const fetchKimchi = async () => {
    const { data } = await axios.get('http://localhost:3003/kimchis');
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

  const test = paramID ? true : false;
  console.log(paramID);

  console.log(test);
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

        {kimchi.map((k) => {
          console.log(paramID, k.category);
          if (paramID === k.category) {
            return (
              <div>
                <h1>{k.category}</h1>
                <p>{k.name}</p>
              </div>
            );
          }
        })}
      </div>

      <div></div>
    </>
  );
}
