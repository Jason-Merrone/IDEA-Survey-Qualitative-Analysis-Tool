import React from 'react';
import Link from 'next/link';
import "~/styles/globals.css";

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
          <li className='menuItem'><Link href="/menu1">Home</Link></li>
          <li className='menuItem'><Link href="/menu2">Dashboard</Link></li>
          <li className='menuItem'><Link href="/menu3">AI Chat</Link></li>
          <li className='menuItem'><Link href="/menu4">Settings</Link></li>
        </ul>
    </nav></>
  );
};

export default Header;
