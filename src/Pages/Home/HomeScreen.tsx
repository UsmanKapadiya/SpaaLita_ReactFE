import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeAboutBanner from '../../assets/images/home-about.jpg';
import ServicBanner from '../../assets/images/our_service.jpg';
import Gift_card from '../../assets/images/gift_card.jpg';
import ContactSection from '../../Component/ContactSection/ContactSection';
import Footer from '../../Component/Footer/Footer';

import './HomeScreen.css';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const modalShown = localStorage.getItem('homeModalShown');
    if (!modalShown) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [showModal]);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem('homeModalShown', 'true');
  };
  return (
    <div className="home-screen ">
      {/* Welcome Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ opacity: 0.5 }}></div>
          <div 
            className="modal fade show" 
            tabIndex={-1} 
            role="dialog" 
            id="home_modal" 
            style={{ paddingRight: '15px', display: 'block', overflowY: 'auto' }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document" style={{ margin: '3rem auto' }}>
              <div className="modal-content">
                <div className="modal-header">
                  <div className="text-center w-100">
                    <img 
                      src="https://spaalita.ca/wp-content/themes/spaalita/images/SpaAlita_logo.png" 
                      width="210" 
                      alt="Logo"
                    />
                  </div>
                  <button 
                    type="button" 
                    className="close" 
                    onClick={handleCloseModal}
                    aria-label="Close"
                    style={{ 
                      position: 'absolute', 
                      right: '15px', 
                      top: '15px',
                      background: 'transparent',
                      border: 'none',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      lineHeight: 1,
                      color: '#000',
                      textShadow: '0 1px 0 #fff',
                      opacity: 0.5,
                      cursor: 'pointer'
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="container-fluid">
                    <div className="col-lg-12">
                      <figure className="wp-block-gallery has-nested-images columns-default is-cropped wp-block-gallery-1">
                        <img 
                          decoding="async" 
                          width="1024" 
                          height="1024" 
                          src="https://spaalita.ca/wp-content/uploads/2026/01/2026-FebSpecials-1024x1024.png" 
                          alt="February Specials" 
                          className="wp-image-18083"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div>
        <img
          src='https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-5.jpg'
          alt="Spaalita Banner"
          className="home-banner"
          style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
        />
      </div>
      <div className='container mb-4'>
        <div className="row">
          <div className="col-md-6 bg-240 d-flex align-items-center justify-content-center mb-2">
            <div className="text-center py-2 px-5">
              <h1>WHO WE ARE</h1>
              <h5 className="mt-2">Committed to Beauty and Wellness</h5>
              <p className="who-we-are">At Spa A'lita, we are committed to creating an "Oasis" where the stresses
                of everyday life are left behind and your well being is nurtured and protected. It is our goal
                to continually educate our clients in the latest trends and technologies in the health and
                beauty industry and to expand these resources into a beautiful, tranquil and quality service
                environment, for all those in need of pampering.</p>
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <img
              className="img-fluid"
              src={HomeAboutBanner}
              alt="Who we are"
            />
          </div>
        </div>
      </div>
      <div className="position-relative">
        <img
          src={ServicBanner}
          alt="Our services"
          className="img-fluid"
        />
        <div className="our-service">
          <div className="our-service-text" onClick={() => navigate('/services')} style={{ cursor: 'pointer' }}>our services</div>
        </div>
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <figure className="wp-block-image size-large">
              <img
                src={Gift_card}
                alt="Gift card"
              />
            </figure>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="w-75">
              <h1 className="font-weight-bold">Spa A'lita Gift Cards</h1>
              <h5 className="gift-card-h5 my-5">Purchase one of our gift cards securely online through Paypal and we
                will send the gift card directly to you or your loved one!</h5>
              <button className="round-buttton d-inline-block" onClick={() => navigate('/giftcard')}>Purchase</button>
            </div>
          </div>
        </div>
      </div>
      <ContactSection topPadding="" normalFont={false} />
      <div className="my-5 py-5">
        <div className="w-100">
          <div className="map-container" style={{ height: '400px', width: '100%', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDv4daZyOfRCdRf1YtyD6hUHNe5Aeep-BM&amp;q=101-745 Goldstream Ave,Victoria,BC,V9B 2X4"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Spa A'lita Location"
            />
          </div>
        </div>
      </div>
      <div className="my-5" id="business-hours">
        <div className="col-lg-3 col-sm-6 m-auto text-center">
          <h5 className="text-center mt-2 mb-4">REGULAR BUSINESS HOURS:</h5>
          <table>
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
      <Footer />
    </div>

  );
};

export default HomeScreen;
