import React from 'react';

import { Container, SignWrapper } from '../styles/style';
import SignupForm from 'component/signupForm';

const Signup = () => {
  return (
    <Container>
      <SignWrapper>
        <h1>회원가입</h1>
        <SignupForm />
      </SignWrapper>
    </Container>
  );
};

export default Signup;
