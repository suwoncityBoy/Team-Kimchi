import axios from 'axios';
import React, { useState } from 'react';
import { SERVER_ADDRESS } from '../../utils/constant';
import { checkPassword } from '../../utils/validate';
import EditForm from '../EditForm/EditForm';

export default function Review({
  id,
  kimchiId,
  nickname,
  content,
  date,
  setReviewData,
}) {
  const [hover, setHover] = useState(false);
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const checkDBPassword = async (input) => {
    // 비밀번호 유효성 검사
    if (!checkPassword(input)) return false;
    // 서버에 비밀번호 맞는지 요청
    const response = await axios.get(`${SERVER_ADDRESS}/reviews?id=${id}`);
    const password = response.data[0].password;
    return password === input ? true : false;
  };

  // 수정 버튼 클릭
  const handleEditBtnClick = async () => {
    const inputPassword = prompt('비밀번호를 입력하세요.');
    const checked = await checkDBPassword(inputPassword);
    if (!checked) {
      alert('비밀번호가 틀립니다.');
      return;
    }
    // 수정할 textarea 보여주기
    setIsTextareaVisible(true);
  };

  // 수정 폼 제출
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // 서버에 데이터 PATCH
    await axios.patch(`${SERVER_ADDRESS}/reviews/${id}`, {
      content: editContent,
    });
    alert('수정이 완료되었습니다.');

    // 데이터 다시 GET, state 업데이트
    const response = await axios.get(
      `${SERVER_ADDRESS}/reviews?kimchiId=${kimchiId}`,
    );
    setReviewData(response.data);

    // textarea 숨기기
    setIsTextareaVisible(false);
  };

  // 삭제 버튼 클릭
  const handleDeleteBtnClick = async () => {
    const inputPassword = prompt('비밀번호를 입력하세요.');
    const checked = await checkDBPassword(inputPassword);
    if (!checked) {
      alert('비밀번호가 틀립니다.');
      return;
    }

    if (window.confirm('정말 삭제하시겠습니까??')) {
      // 서버에 데이터 DELETE
      await axios.delete(`${SERVER_ADDRESS}/reviews/${id}`);
      // 데이터 다시 GET, state 업데이트
      const response = await axios.get(
        `${SERVER_ADDRESS}/reviews?kimchiId=${kimchiId}`,
      );
      setReviewData(response.data);
    }
  };

  return (
    <li
      style={reviewStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={nicknameStyle}>{nickname}</div>
      {isTextareaVisible ? (
        // 수정 상태에서는 form 보여주기
        <EditForm
          onSubmit={handleEditSubmit}
          editContent={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
      ) : (
        // 수정 상태가 아닐 때는 내용 보여주기
        <div style={contentStyle}>{content}</div>
      )}
      <div style={rightStyle}>
        <div style={dateStyle}>{date}</div>
        <div>
          <button
            style={
              // 리뷰 hover 상태일 때 버튼 보여주기
              hover
                ? { ...hoverBtnStyle, visibility: 'visible' }
                : hoverBtnStyle
            }
            onClick={handleEditBtnClick}
          >
            수정
          </button>
          <button
            style={
              hover
                ? { ...hoverBtnStyle, visibility: 'visible' }
                : hoverBtnStyle
            }
            onClick={handleDeleteBtnClick}
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
}

const reviewStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'start',
  margin: '16px 0',
  lineHeight: '1.5',
  paddingBottom: '16px',
  borderBottom: '1px solid #cdcdcd',
};

const nicknameStyle = {
  width: '100px',
  fontWeight: '500',
};

const contentStyle = {
  width: '600px',
  textAlign: 'left',
};

const dateStyle = {
  width: '150px',
  color: '#828282',
};

const rightStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const hoverBtnStyle = {
  fontSize: '14px',
  border: '1px solid grey',
  borderRadius: '4px',
  background: 'transparent',
  padding: '4px 8px ',
  margin: '10px 5px',
  visibility: 'hidden',
  cursor: 'pointer',
  width: '50px',
};
