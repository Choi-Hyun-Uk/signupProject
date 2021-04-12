import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  margin: 100px auto 0 auto;
  padding: 50px 26px;
  width: 480px;

  background: white;
  box-sizing: border-box;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  text-align: center;
`;

export const SignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  & h1 {
    margin-bottom: 40px;
  }

  & input {
    width: 100%;
    height: 42px;
    padding-left: 12px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-bottom: 2px solid #ced4da;
    &:focus {
      border-bottom: 2px solid #5c7cfa;
    }
  }

  & button {
    display: block;
    width: 100%;
    font-size: 16px;
    line-height: 42px;
    border-radius: 6px;
    cursor: pointer;
    background: #91a7ff;
    color: #fff;
    &:hover {
      background: #5c7cfa;
    }
  }
`;

export const ProfileWrapper = styled.div`
  & div {
    margin-bottom: 50px;
  }

  & h1 {
    margin-bottom: 20px;
  }

  & strong {
    color: #5c7cfa;
  }

  & p {
    padding: 0;
    margin: 0;
  }

  & button {
    padding: 8px 12px;
    background: transparent;
    border: 1px solid #e03131;
    border-radius: 6px;
    color: #e03131;
    cursor: pointer;
  }

  & a {
    display: inline-block;
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    color: #ced4da;
    &:hover {
      border: 1px solid #5c7cfa;
      color: #5c7cfa;
    }
  }
`;
