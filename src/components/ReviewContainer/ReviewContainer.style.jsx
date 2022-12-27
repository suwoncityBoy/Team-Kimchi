import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1010px;
  margin: auto;
  display: flex;
  padding: 10px;
  flex-direction: column;
  min-height: 600px;
`;

export const Button = styled.button`
  background-color: #d82424;
  padding: 10px 20px;
  border: none;
  border-radius: 0.5rem;
  color: white;
  float: right;
  cursor: pointer;
`;

export const Form = styled.form`
  width: 100%;
  margin-bottom: 20px;
`;

export const Alert = styled.p`
  margin-top: 10px;
  color: #d82424;
`;
