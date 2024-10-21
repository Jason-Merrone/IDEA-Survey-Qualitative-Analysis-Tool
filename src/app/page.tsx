import React from 'react';
import "~/styles/globals.css";
import "~/styles/page.css";
import Card from '~/components/card';

const HomePage = () => {
  return (
    <><div>
      <div className='gradientBlock title roboto-bold'>Home</div>
      <div className='content roboto-regular'>
      <Card 
            title="Recent Activity" 
            content={
            <>
                <li><a href="/notifications">CS-3450: Chat</a></li>
                <li><a href="/notifications">MATH-2100: Chat</a></li>
                <li><a href="/notifications">STATS-1400: Chat</a></li>
                <li><a href="/notifications">CS-1400: Report</a></li>
                <li><a href="/notifications">CS-1410: Report</a></li>
                <li><a href="/notifications">CS-2850: Chat</a></li>
            </>
            }
        />
        <Card 
            title="Completed Reports" 
            content={
            <>
                <li><a href="/tasks">CS-3450</a></li>
                <li><a href="/tasks">CS-3700</a></li>
                <li><a href="/tasks">CS-2420</a></li>
                <li><a href="/tasks">CS-1410</a></li>
            </>
            }
        />
        <Card 
            title="System Status" 
            content={
            <>
                All systems are operational. <a href="/status">View system details</a>
            </>
            }
        />
      </div>
    </div></>
  );
};

export default HomePage;
