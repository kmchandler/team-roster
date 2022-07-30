import React, { useEffect } from 'react';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';

  <Head>
    <meta charset="UTF-8" />
    <meta name="keywords" content="title, meta, nextjs" />
    <meta name="author" content="Shalane Proctor" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ROOST</title>
  </Head>;

function Home() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'ROOST';
  }, []);

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
