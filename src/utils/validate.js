// 닉네임 유효성 검사
export function validateNickname(nickname) {
  const name = nickname.trim();
  // 이름이 공백일 경우
  if (name === '') return false;
  // 이름이 2자 미만, 10자 초과일 경우
  if (name.length < 2 || name.length > 10) return false;
  // 이름이 한글, 영어, 숫자 이외의 문자를 포함할 경우
  if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/.test(name)) return false;

  return true;
}

// 비밀번호 유효성 검사
export function validatePassword(password) {
  // 비밀번호가 4자가 아닐 경우
  if (password.length !== 4) return false;
  // 비밀번호가 숫자로만 이루어져 있지 않을 경우
  if (!/^[0-9]+$/.test(password)) return false;

  return true;
}
