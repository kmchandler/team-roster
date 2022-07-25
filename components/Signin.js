import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <Card className="loginCardDiv">
      <Card.Body>
        <Card.Title className="roost">ROOST</Card.Title>
        <Card.Subtitle className="taglineLogin">your home for team management</Card.Subtitle>
        <Button type="button" size="lg" className="copy-btn loginBtn" onClick={signIn}>
          Sign In
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Signin;
