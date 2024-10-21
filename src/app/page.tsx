import React from 'react';
import "~/styles/globals.css";
import "~/styles/page.css";
import Card from '~/components/card';

const HomePage = () => {
  return (
    <><div>
      <div className='gradientBlock title roboto-bold'>Home</div>
      <div className='content roboto-regular'>
        <Card title={'Recent Activity'} content={'CS-3450'} />
      </div>
    </div></>
  );
};

export default HomePage;
