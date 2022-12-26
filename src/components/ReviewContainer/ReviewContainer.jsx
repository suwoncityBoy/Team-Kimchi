import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getDate from '../../utils/getDate';
import { validateNickname, validatePassword } from '../../utils/validate';
import Review from '../Review/Review';

export default function ReviewContainer() {
  const { id: kimchiId } = useParams();
  const [reviewData, setReviewData] = useState([]);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    const isValidNickname = validateNickname(nickname);
    if (!isValidNickname) {
      console.log(
        '닉네임은 한글, 영어, 숫자로 이루어진 2자 이상 10자 이하의 문자열입니다.',
      );
      // TODO: 경고표시 후 리턴
      return;
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      console.log('비밀번호는 숫자 4자리입니다.');
      // TODO: 초기화 후 리턴
      return;
    }

    // TODO: 내용 유효성 검사

    const data = {
      kimchiId,
      nickname,
      password,
      content,
      date: getDate(),
    };

    axios.post('http://localhost:3001/reviews', data);
    console.log('review 저장 성공');
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/reviews?kimchiId=${kimchiId}`)
      .then((response) => setReviewData(response.data));
  }, [kimchiId]);

  return (
    <div
      style={{
        maxWidth: '1010px',
        margin: 'auto',
        display: 'flex',
        padding: '10px',
        flexDirection: 'column',
      }}
    >
      {/* 리뷰 입력 폼 */}
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          <label>
            닉네임
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              required
              minLength="1"
              maxLength="10"
              style={inputStyle}
            />
          </label>
          <label>
            비밀번호
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              minLength="4"
              maxLength="4"
              style={inputStyle}
            />
          </label>
        </div>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
          }}
        >
          자세한 후기를 들려주세요
          <textarea
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            required
            minLength="10"
            maxLength="300"
            style={textareaStyle}
          />
        </label>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button type="submit" style={btnStyle}>
            등록하기
          </button>
        </div>
      </form>
      {/* 리뷰 리스트 */}
      <div style={{ padding: '10px' }}>
        <ul>
          {reviewData.map((review) => (
            <Review
              key={review.id}
              nickname={review.nickname}
              content={review.content}
              date={review.date}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

const textareaStyle = {
  resize: 'none',
  margin: '16px 0',
  height: '200px',
  border: '1px solid #c2c2c2',
  borderRadius: '4px',
};

const btnStyle = {
  backgroundColor: 'red',
  padding: '10px 20px',
  border: 'none',
  color: ' white',
};

const inputStyle = {
  margin: '0 16px',
  height: '24px',
  width: '200px',
  border: '1px solid #c2c2c2',
  borderRadius: '4px',
};
