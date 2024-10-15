import React from 'react';
import Header from '../components/header';
import "~/styles/globals.css";

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to the Homepage</h1>
        <p>This is the content of the homepage.</p>
      </main>
    </div>
  );
};

export default HomePage;
