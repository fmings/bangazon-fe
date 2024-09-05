import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div>
      {/* <h1>Hi there!</h1>
      <p>Click the button below to login!</p> */}
      <Button type="button" size="lg" className="copy-btn" variant="dark" onClick={signIn}>
        Sign In/Register
      </Button>
    </div>
  );
}

export default Signin;
