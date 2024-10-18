import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer'
import "~/styles/globals.css";

const HomePage = () => {
  return (
    <div>
      <div>
      <Header />
      <main>
        <h1>Welcome to the Homepage</h1>
        <p>This is the content of the homepage.</p>
        <br /><br /><br /><br /><br />
      </main>
      <Footer />
      </div>
    </div>
  );
};

export default HomePage;
