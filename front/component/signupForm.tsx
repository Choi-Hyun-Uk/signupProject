import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';

import { signup } from '../actions/user';
import { ErrorText } from 'component/style';
import { RootState } from '../slices';
import Router from 'next/router';

const SignupForm = () => {
  const [nickname, onChangeNickname] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const signupError = useSelector((state: RootState) => state.user.signupError);
  const signupDone = useSelector((state: RootState) => state.user.signupDone);
  const dispatch = useDispatch();

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  if (signupDone) {
    Router.replace('/');
  }

  // 추후 약관 동의 사용 시 e.target.checked로 확인 가능

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      // 비밀번호 한번 더 체크
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      dispatch(
        signup({
          nickname: nickname,
          email: email,
          password: password,
        })
      );
    },
    [dispatch, nickname, email, password, passwordCheck]
  );
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div>
          <label>
            <input
              type="text"
              value={nickname}
              placeholder="닉네임"
              onChange={onChangeNickname}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="text"
              value={email}
              placeholder="이메일"
              onChange={onChangeEmail}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={onChangePassword}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              value={passwordCheck}
              placeholder="비밀번호확인"
              onChange={onChangePasswordCheck}
            />
          </label>
          {passwordError && (
            <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
          )}
        </div>
        {signupError && <ErrorText>{signupError}</ErrorText>}
        <button type="submit">가입완료</button>
      </form>
    </>
  );
};

export default SignupForm;
