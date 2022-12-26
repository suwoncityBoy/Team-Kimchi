import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Kimchi from '../Kimchi/Kimchi';

export default function KimchiRecommend() {
  const [kimchi, setKimchi] = useState([]);

  const fetchKimchi = async () => {
    const { data } = await axios.get('http://localhost:3001/kimchis');
    setKimchi(data);
  };

  useEffect(() => {
    fetchKimchi();
  }, []);

  const [randomSetArray, setRandomSetArray] = useState([]);
  const [randomDone, setRandomDone] = useState(false);
  useEffect(() => {
    let allkimchi = kimchi;
    if (kimchi.length > 0 && !randomDone) {
      for (let i = 1; i <= 4; i++) {
        //let randomNum = Math.floor(Math.random() * kimchi.length);
        //if (randomSetArray.indexOf(randomNum) === -1) {
        //randomSetArray.push(kimchi[randomSetArray]);
        //}

        let randomNum = Math.floor(Math.random() * allkimchi.length);
        randomSetArray.push(allkimchi[randomNum]);
        allkimchi.splice(randomNum, 1);
        setRandomDone(true);
      }
    }
    console.log(randomSetArray);
  }, [kimchi]);
  return (
    <div style={{ marginTop: '3rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '1.4rem' }}>
        이 김치는 어떠세요?
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '3rem',
        }}
      >
        {randomSetArray.map((k) => {
          if (randomSetArray.length > 0) {
            return <Kimchi k={k} />;
          }
        })}
      </div>
    </div>
  );
}
