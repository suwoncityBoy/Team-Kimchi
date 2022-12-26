import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getDate from '../../utils/getDate';
import {
  checkContent,
  checkNickname,
  checkPassword,
} from '../../utils/validate';
import Review from '../Review/Review';

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
    await axios.post('http://localhost:3001/reviews', data);

    // review 데이터 GET -> state 업데이트
    const response = await axios.get(
      `http://localhost:3001/reviews?kimchiId=${kimchiId}`,
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
      .get(`http://localhost:3001/reviews?kimchiId=${kimchiId}`)
      .then((response) => setReviewData(response.data));
  }, [kimchiId]);

  return (
    <div style={containerStyle}>
      {/* 리뷰 입력 폼 */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          <label>
            닉네임
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              maxLength="7"
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
              maxLength="4"
              style={inputStyle}
            />
          </label>
          {/* 경고 문구 */}
          {alertDisplay && <p style={alertStyle}>{alertText}</p>}
        </div>
        <label style={contentLabelStyle}>
          자세한 후기를 들려주세요
          <textarea
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            // required
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
    </div>
  );
}

const containerStyle = {
  maxWidth: '1010px',
  margin: 'auto',
  display: 'flex',
  padding: '10px',
  flexDirection: 'column',
};

const formStyle = {
  width: '100%',
  marginBottom: '20px',
};

const inputStyle = {
  margin: '0 16px',
  height: '24px',
  width: '200px',
  border: '1px solid #c2c2c2',
  borderRadius: '4px',
  fontFamily: 'normal',
  fontSize: '16px',
};

const contentLabelStyle = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
};

const textareaStyle = {
  fontSize: '16px',
  resize: 'none',
  margin: '16px 0',
  height: '200px',
  border: '1px solid #c2c2c2',
  borderRadius: '4px',
  fontFamily: 'normal',
};

const alertStyle = {
  marginTop: '10px',
  color: 'red',
};

const btnStyle = {
  backgroundColor: '#d82424',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  color: ' white',
  cursor: 'pointer',
};
