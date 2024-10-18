import React from 'react';
import Link from 'next/link';
import "~/styles/globals.css";
import "~/styles/footer.css";

const Footer: React.FC = () => {
  return (
    <>
      {/* First Footer Section */}
      <footer className="footer">
        <div className="footer-container contact-info">
          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="footer-icons">
              <li><Link href="https://www.facebook.com/usu"><img src="icons/facebook_icon.png" alt="" /></Link></li>
              <li><Link href="https://www.instagram.com/usuaggielife/"><img src="icons/instagram_icon.png" alt="" /></Link></li>
              <li><Link href="https://twitter.com/USUAggies"><img src="icons/X_icon.png" alt="" /></Link></li>
              <li><Link href="https://www.youtube.com/user/USUAggieLife"><img src="icons/youtube_icon.png" alt="" /></Link></li>
            </ul>
            <address>
              0500 Old Main Hill <br />
              Logan, UT 84322 <br />
              (435) 797-1351
            </address>
          </div>
        </div>
      </footer>

      {/* Second Footer Section */}
      <footer className="footerTwo roboto-regular">
        <div className="footerTwo-container">
          <Link href="https://www.usu.edu/" className="logo-image">
            <img src="images/utah-state-logo-350.png" alt="Logo" className='logo-image' />
          </Link>
          <div className="footer-links-container">
            <ul className="footer-links maps">
              <li><Link href="/">Maps & Directions</Link></li>
              <li><Link href="/">Search USU</Link></li>
              <li><Link href="/">Campus Safety</Link></li>
              <li><Link href="/">Jobs</Link></li>
              <li><Link href="/">Contact</Link></li>
            </ul>
            <ul className="footer-links terms">
              <li><Link href="/">Terms of Use</Link></li>
              <li><Link href="/">Copyright</Link></li>
              <li><Link href="/">Privacy</Link></li>
              <li><Link href="/">Accessibility</Link></li>
              <li><Link href="/">Non-Discrimination</Link></li>
              <li><Link href="/">Admin</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
