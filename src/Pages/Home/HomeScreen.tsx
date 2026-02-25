import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeAboutBanner from '../../assets/images/home-about.jpg';
import ServicBanner from '../../assets/images/our_service.jpg';
import Gift_card from '../../assets/images/gift_card.jpg';
import ContactSection from '../../Component/ContactSection/ContactSection';
import Footer from '../../Component/Footer/Footer';
import WelcomeModal from './WelcomeModal';
import BusinessHours from './BusinessHours';
import { useWelcomeModal } from './useWelcomeModal';
import { STORAGE_KEYS, HOME_URLS, CONTENT } from './homeConstants';
import './HomeScreen.css';

const HomeScreen: FC = () => {
  const navigate = useNavigate();
  const { showModal, closeModal, monthlySpecialUrl } = useWelcomeModal(STORAGE_KEYS.HOME_MODAL_SHOWN);
  return (
    <div className="home-screen">
      <WelcomeModal show={showModal} onClose={closeModal} monthlySpecialUrl={monthlySpecialUrl} />
      <div>
        <img
          src={HOME_URLS.BANNER}
          alt="Spaalita Banner"
          className="home-banner"
        />
      </div>
      <div className="container mb-4">
        <div className="row">
          <div className="col-md-6 bg-240 d-flex align-items-center justify-content-center mb-2">
            <div className="text-center py-2 px-5">
              <h1>{CONTENT.WHO_WE_ARE.TITLE}</h1>
              <h5 className="mt-2">{CONTENT.WHO_WE_ARE.SUBTITLE}</h5>
              <p className="who-we-are">{CONTENT.WHO_WE_ARE.DESCRIPTION}</p>
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
          <div 
            className="our-service-text" 
            onClick={() => navigate('/services')}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/services')}
            role="button"
            tabIndex={0}
            aria-label="View our services"
          >
            our services
          </div>
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
              <h1 className="font-weight-bold">{CONTENT.GIFT_CARD.TITLE}</h1>
              <h5 className="gift-card-h5 my-5">{CONTENT.GIFT_CARD.DESCRIPTION}</h5>
              <button 
                className="round-buttton d-inline-block" 
                onClick={() => navigate('/giftcard')}
                aria-label="Purchase gift card"
              >
                {CONTENT.GIFT_CARD.BUTTON_TEXT}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ContactSection topPadding="" normalFont={false} />

      <div className="my-5 py-5">
        <div className="w-100">
          <div className="map-container">
            <iframe
              src={HOME_URLS.GOOGLE_MAPS_EMBED}
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

      <BusinessHours />

      <Footer />
    </div>
  );
};

export default HomeScreen;
