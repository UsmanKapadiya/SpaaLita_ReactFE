import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import { SERVICES_LIST, SERVICES_HERO_IMAGE, SERVICES_HERO_CONTENT } from './ServicesConstants';
import { BOOK_NOW_URL  } from '../../utils/constants';
import './ServicesPage.css';

const ServicesPage: FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = useCallback((link: string) => {
    navigate(`/${link}`);
  }, [navigate]);

  return (
    <div className="services-page">
      <div className="container-fluid px-0">
        <BookNowButton className="mb-3" url={BOOK_NOW_URL} />
        <div style={{height:50}} aria-hidden="true" class="wp-block-spacer"></div>
        {/* Hero Section */}
        <div className="hero-section">
          <div className="position-relative">
            <img 
              src={SERVICES_HERO_IMAGE} 
              alt="Services at Spa A'lita" 
              className="img-fluid hero-image " 
            />
            <div className="our-service">
              <div className="service-text">
                <h1 className="text-uppercase mb-4">{SERVICES_HERO_CONTENT.TITLE}</h1>
                <h6>{SERVICES_HERO_CONTENT.SUBTITLE}</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {SERVICES_LIST.map((service, index) => (
            <div key={service.link} className={`service-item ${service.backgroundClass}`}>
              <div className={`service-content`}>
                <div className="service-image">
                  <img 
                    src={service.image} 
                    alt={service.alt}
                    className="img-fluid" 
                  />
                </div>
                <div className="service-info">
                  <h5 className={`text-underline ${service.textClass || ''}`}>
                    {service.title}
                  </h5>
                  <button 
                    className={`round-buttton service-learn-more ${service.textClass || ''}`} 
                    onClick={() => handleServiceClick(service.link)}
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <BookNowButton className="mt-4" url={BOOK_NOW_URL} />
      </div>
    </div>
  );
};

export default ServicesPage;