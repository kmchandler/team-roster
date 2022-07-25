import React from 'react';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="mainPage text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
      }}
    >
      <div>
        <h1 className="roost">ROOST</h1>
        <h4 className="taglineLogin">your home for team management</h4>
        <h2 className="mainGreeting">Welcome, {user.displayName}!</h2>
      </div>
    </div>
  );
}

export default Home;
