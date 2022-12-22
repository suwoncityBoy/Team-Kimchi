import React from 'react';
import { useParams } from 'react-router-dom';

export default function MyPage() {
  const paramId = useParams().id;

  return <div>김치 아이디 : {paramId}</div>;
}

// https://reactrouter.com/en/main/hooks/use-params
