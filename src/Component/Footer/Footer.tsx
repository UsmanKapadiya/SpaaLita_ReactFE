import React from 'react';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="my-5" id="business-hours">
        <div className="col-lg-3 col-sm-6 m-auto text-center">
          <h5 className="text-center mt-2 mb-4">REGULAR BUSINESS HOURS:</h5>
          <table className="mx-auto table-borderless">
            <tbody>
              <tr>
                <td>Monday</td>
                <td>9:00 AM - 7:30 PM</td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>9:00 AM - 7:30 PM</td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>9:00 AM - 7:30 PM</td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>9:00 AM - 7:30 PM</td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>9:00 AM - 7:30 PM</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>9:30 AM - 7:30 PM</td>
              </tr>
              <tr>
                <td>Sunday</td>
                <td>9:30 AM - 7:30 PM</td>
              </tr>
            </tbody>
          </table>
          <h6 className="text-center my-4">Please call us to inquire if you would like to schedule an appointment outside of our opening hours or on a statutory holiday.</h6>
        </div>
      </div>

      <div className="newsletter-signup">
        <p>Please sign up to receive updates and promotional offers</p>
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
      <div className='socialMediaDiv'>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="icon-circle">
          <InstagramIcon fontSize="medium" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="icon-circle">
          <FacebookIcon fontSize="medium" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
