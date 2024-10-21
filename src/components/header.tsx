import React from 'react';
import Link from 'next/link';
import "~/styles/globals.css";
import "~/styles/header.css";

const Header: React.FC = () => {
  return (
    <><header className='header'>
      {/* Logo Section */}
      <div className='logo'>
        <Link href="https://www.usu.edu/" className='logoImage'>
          <img src="images/utah-state-logo-350.png" alt="Logo" className='logoImage' />
        </Link>
        <div className='separator'></div>

        <div className='textContainer'>
          <Link href="/" className='collegeText roboto-stretch'>
            IDEA Qualitative Analysis
          </Link>
          <Link href="/" className='logoText roboto-stretch'>
            College of Science
          </Link>
        </div>
      </div>
    </header>
    <nav className='menu roboto-stretch'>
        <ul className='menuList'>
          <li className='menuItem'><Link href="/">Home</Link></li>
          <li className='menuItem'><Link href="/dashboard">Dashboard</Link></li>
          <li className='menuItem'><Link href="/chat">AI Chat</Link></li>
          <li className='menuItem'><Link href="/settings">Settings</Link></li>
        </ul>
    </nav></>
  );
};

export default Header;
