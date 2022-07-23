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
      <h2>Hello, {user.displayName}!</h2>
      <div className="teamNameMain">
        <h3 className="welcomeTo">Welcome to </h3>
        <h3 className="teamNameMainPage"> 1.21 Jigawatts Productions</h3>
      </div>
    </div>
  );
}

export default Home;
