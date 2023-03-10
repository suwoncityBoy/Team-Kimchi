import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { SERVER_ADDRESS } from '../../utils/constant';
import getDate from '../../utils/getDate';
import {
  checkContent,
  checkNickname,
  checkPassword,
} from '../../utils/validate';

import * as styled from './ReviewContainer.style';

import Review from '../Review/Review';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';

export default function ReviewContainer() {
  const { id: kimchiId } = useParams();

  // 서버에서 불러오는 review 데이터
  const [reviewData, setReviewData] = useState([]);

  // input 값
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');

  // 경고 문구
  const [alertText, setAlertText] = useState('');
  const [alertDisplay, setAlertDisplay] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 닉네임 유효성 검사
    setNickname((name) => name.trim());
    const isValidNickname = checkNickname(nickname);
    if (!isValidNickname) {
      setAlertText(
        '닉네임은 한글, 영어, 숫자로 이루어진 2자 이상 10자 이하의 문자열입니다.',
      );
      setAlertDisplay(true);
      return;
    }

    // 비밀번호 유효성 검사
    const isValidPassword = checkPassword(password);
    if (!isValidPassword) {
      setAlertText('비밀번호는 숫자 4자리입니다.');
      setAlertDisplay(true);
      setPassword('');
      return;
    }

    // 내용 유효성 검사
    setContent((content) => content.trim());
    const isValidContent = checkContent(content);
    if (!isValidContent) {
      setAlertText('내용은 10자 이상 300자 이하입니다.');
      setAlertDisplay(true);
      return;
    }

    // 서버에 데이터 POST
    const data = {
      kimchiId,
      nickname,
      password,
      content,
      date: getDate(),
    };
    await axios.post(`${SERVER_ADDRESS}/reviews`, data);

    // review 데이터 GET -> state 업데이트
    const response = await axios.get(
      `${SERVER_ADDRESS}/reviews?kimchiId=${kimchiId}`,
    );
    setReviewData(response.data);

    // 입력 폼 초기화
    setNickname('');
    setPassword('');
    setContent('');

    // 경고 문구 초기화
    setAlertDisplay(false);
    setAlertText('');
  };

  useEffect(() => {
    axios
      .get(`${SERVER_ADDRESS}/reviews?kimchiId=${kimchiId}`)
      .then((response) => setReviewData(response.data));
  }, [kimchiId]);

  return (
    <styled.Container>
      {/* 리뷰 입력 폼 */}
      <styled.Form onSubmit={handleSubmit}>
        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          <Input
            label="닉네임"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength="7"
          />
          <Input
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength="4"
          />
          {/* 경고 문구 */}
          {alertDisplay && <styled.Alert>{alertText}</styled.Alert>}
        </div>

        <Textarea
          label="자세한 후기를 들려주세요"
          content={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <styled.Button type="submit">등록하기</styled.Button>
      </styled.Form>
      {/* 리뷰 리스트 */}
      <div style={{ padding: '10px' }}>
        <ul>
          {reviewData.map((review) => (
            <Review
              key={review.id}
              id={review.id}
              kimchiId={kimchiId}
              nickname={review.nickname}
              content={review.content}
              date={review.date}
              setReviewData={setReviewData}
            />
          ))}
        </ul>
      </div>
    </styled.Container>
  );
}
