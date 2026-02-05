import React from 'react';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer = () => {
  return (
    // <footer className="footer">
    <div>
      <div className="newsletter-signup">
        <p className='mb-0'>Please sign up to receive updates and promotional offers</p>
        <form onSubmit={e => e.preventDefault()} className="newsletter-form">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="newsletter-input"
              required
            />
          </div>
          <div>
            <button type="submit" className="newsletter-btn">Submit</button>
          </div>
        </form>
      </div>
      <div className='container'>
        <div className="row mb-5">
          <div className="col-lg-5 m-auto text-center">
            <h6 className="my-2">spaalitaoffice@shaw.ca</h6>
            <h6>(250) 478-2252</h6>
            <h6 className="mt-3">101-745 Goldstream Ave,Victoria,BC,V9B 2X4</h6>
            <h6>©2026 by Spa A'lita.</h6>
          </div>
        </div>
      </div>
      <div className='socialMediaDiv mb-5'>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="icon-circle">
          <InstagramIcon fontSize="medium" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="icon-circle">
          <FacebookIcon fontSize="medium" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
