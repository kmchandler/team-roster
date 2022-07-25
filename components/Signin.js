import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
      }}
    >
      <div>
        <h1 className="roost">ROOST</h1>
        <h4 className="taglineLogin">your home for team management</h4>
      </div>
      <Button type="button" size="lg" className="copy-btn loginBtn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
