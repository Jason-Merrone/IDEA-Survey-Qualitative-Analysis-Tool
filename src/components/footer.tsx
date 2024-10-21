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
              <li><Link href="https://www.facebook.com/UtahState/"><img src="icons/facebook_icon.png" alt="" /></Link></li>
              <li><Link href="https://www.instagram.com/usuaggielife/"><img src="icons/instagram_icon.png" alt="" /></Link></li>
              <li><Link href="https://twitter.com/USUAggies"><img src="icons/X_icon.png" alt="" /></Link></li>
              <li><Link href="https://www.youtube.com/user/UtahStateUniversity"><img src="icons/youtube_icon.png" alt="" /></Link></li>
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
              <li><Link href="https://www.usu.edu/map/">Maps & Directions</Link></li>
              <li><Link href="https://www.usu.edu/search/">Search USU</Link></li>
              <li><Link href="https://www.usu.edu/campus-life/safety/">Campus Safety</Link></li>
              <li><Link href="https://www.usu.edu/hr/jobs/">Jobs</Link></li>
              <li><Link href="https://www.usu.edu/contact/">Contact</Link></li>
            </ul>
            <ul className="footer-links terms">
              <li><Link href="https://www.usu.edu/copyright/">Terms of Use</Link></li>
              <li><Link href="https://www.usu.edu/copyright/index.cfm#copyright">Copyright</Link></li>
              <li><Link href="https://www.usu.edu/privacy/">Privacy</Link></li>
              <li><Link href="https://www.usu.edu/accessibility/">Accessibility</Link></li>
              <li><Link href="https://www.usu.edu/equity/non-discrimination/">Non-Discrimination</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
