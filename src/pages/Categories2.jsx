import React, { useEffect, useState } from 'react';
import Kimchi from '../components/Kimchi/Kimchi';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Categories2() {
  const [kimchi, setKimchi] = useState([]);

  const fetchKimchi = async () => {
    const { data } = await axios.get('http://localhost:3003/kimchis');
    setKimchi(data);
  };

  useEffect(() => {
    fetchKimchi();
  }, []);

  console.log(kimchi);
  const paramID = useParams().id;
  // console.log(paramId);

  return (
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
  );
}
