import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VscLoading } from 'react-icons/vsc';
import { RiKakaoTalkFill, RiGoogleFill } from 'react-icons/ri';
import Link from 'next/Link';

import {
  LoginWrapper,
  ErrorText,
  SnsSignupBox,
  LocalSignupBox,
  LoginFormBox,
} from './style';
import { logIn } from '../actions/user';
import useInput from '../hooks/useInput';
import { RootState } from '../slices';

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const logInError = useSelector((state: RootState) => state.user.logInError);
  const passwordInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setPasswordError(false);
    setEmailError(false);
  }, []);

  useEffect(() => {
    if (logInError) {
      if (logInError === '비밀번호가 일치하지 않습니다.') {
        setPasswordError(true);
        passwordInput.current?.focus();
      } else {
        setEmailError(true);
      }
    }
  }, [logInError]);

  const onSubmitLogIn = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        logIn({
          email,
          password,
        })
      );
    },
    [email, password, dispatch]
  );

  return (
    <LoginWrapper>
      <h1>로그인</h1>
      <LoginFormBox onSubmit={onSubmitLogIn}>
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
              ref={passwordInput}
              value={password}
              placeholder="비밀번호"
              onChange={onChangePassword}
            />
          </label>
        </div>
        {emailError && <ErrorText>{logInError}</ErrorText>}
        {passwordError && <ErrorText>{logInError}</ErrorText>}
        <button type="submit">로그인</button>
      </LoginFormBox>
      <SnsSignupBox>
        <h2>SNS 간편 로그인</h2>
        <div>
          <Link href="http://localhost:3051/auth/kakao">
            <a>
              <RiKakaoTalkFill className="kakao-btn" />
            </a>
          </Link>
          <Link href="http://localhost:3051/auth/google">
            <a>
              <RiGoogleFill className="google-btn" />
            </a>
          </Link>
        </div>
      </SnsSignupBox>
      <LocalSignupBox>
        <p>아직 회원이 아니신가요?</p>
        <div>
          <Link href="/signup">회원가입</Link>
        </div>
      </LocalSignupBox>
      {isLoading && <VscLoading className="loading" />}
    </LoginWrapper>
  );
};

export default LoginForm;
