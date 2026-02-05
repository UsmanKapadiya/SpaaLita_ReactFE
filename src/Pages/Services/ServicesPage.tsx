import React from 'react';
import { useNavigate } from 'react-router-dom';
import Facials from '../../assets/images/Facial.jpg';
import Massage from '../../assets/images/massage.jpg';
import Acupressure from '../../assets/images/accupressure.jpg';
import Manicure from '../../assets/images/manicure.jpg';
import BodyTreatment from '../../assets/images/bodyTreatment.jpg';
import Waxing from '../../assets/images/waxing.jpg';
import Laser from '../../assets/images/Laser.jpg';
import Brow from '../../assets/images/browes.jpeg';
import Spa from '../../assets/images/spaa.jpg';
import './ServicesPage.css';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const services = [
    {
      title: 'FACIALS',
      image:  Facials, //'https://spaalita.ca/wp-content/uploads/2023/07/Custom-Facial-2.jpg',
      alt: 'Facial treatments',
      link: 'facials/',
      backgroundClass: 'background-grey'
    },
    {
      title: 'MASSAGE',
      image: Massage, // 'https://spaalita.ca/wp-content/uploads/2023/07/Body-to-body-massage-in-Brigade-Road.jpg',
      alt: 'Massage therapy',
      link: 'massages/',
      backgroundClass: 'background-light',
      textClass: 'text-black'
    },
    {
      title: 'ACUPRESSURE',
      image: Acupressure, //'https://spaalita.ca/wp-content/uploads/2023/07/FOOT-MASSAGE-1.jpg',
      alt: 'Acupressure treatment',
      link: 'acupressure/',
      backgroundClass: 'background-grey',
      textClass: 'text-white'
    },
    {
      title: 'MANICURE & PEDICURE',
      image: Manicure, //'https://spaalita.ca/wp-content/uploads/2023/07/c870x524.jpg',
      alt: 'Manicure and Pedicure',
      link: 'manicures-and-pedicures/',
      backgroundClass: 'background-light',
      textClass: 'text-black'
    },
    {
      title: 'BODY TREATMENTS',
      image: BodyTreatment, //'https://spaalita.ca/wp-content/uploads/2023/07/s17.jpg',
      alt: 'Body treatments',
      link: 'body-treatments/',
      backgroundClass: 'background-grey'
    },
    {
      title: 'WAXING',
      image: Waxing, //'https://spaalita.ca/wp-content/uploads/2023/07/WAXING-1.jpg',
      alt: 'Waxing services',
      link: 'waxing/',
      backgroundClass: 'background-light'
    },
    {
      title: 'LASER HAIR REMOVAL',
      image: Laser, //'https://spaalita.ca/wp-content/uploads/2023/07/Laser-Hair.jpg',
      alt: 'Laser hair removal',
      link: 'Laser-Hair-Removal/',
      backgroundClass: 'background-grey',
      textClass: 'text-white'
    },
    {
      title: 'BROW & LASHES',
      image: Brow, //'https://spaalita.ca/wp-content/uploads/2023/07/AdobeStock_299311362-scaled-1-1024x683.jpeg',
      alt: 'Brow and lash services',
      link: 'brows-and-lashes/',
      backgroundClass: 'background-light'
    },
    {
      title: 'SPA PACKAGES',
      image: Spa, //'https://spaalita.ca/wp-content/uploads/2023/07/shutterstock_1116897128-1642710076-1024x701.jpg',
      alt: 'Spa packages',
      link: 'spa-packages/',
      backgroundClass: 'background-grey'
    }
  ];

  return (
    <div className="services-page">
      <div className="container-fluid px-0">
        {/* Book Now Button */}
        <div className="centerAlign">
          <div className="wp-block-button">
            <a 
              className="wp-block-button__link" 
              href="https://www.fresha.com/book-now/spa-alita-v6pl5cct/services?lid=1090026&pId=1033567"
            >
              BOOK NOW!
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="position-relative">
            <img 
              src="https://spaalita.ca/wp-content/uploads/2021/06/services.jpg" 
              alt="Services" 
              className="img-fluid hero-image" 
            />
            <div className="our-service">
              <div className="service-text">
                <h1 className="text-uppercase mb-4">our services</h1>
                <h6>Treatments You Can Trust</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className={`service-item ${service.backgroundClass}`}>
              <div className="service-content">
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
                    className={`round-buttton d-inline-block mt-5 mb-2 ${service.textClass || ''}`} 
                    onClick={() => navigate(`/${service.link}`)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
              
                      font: 'inherit',
                      textDecoration: 'inherit',
                      color: 'inherit'
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Book Now Button */}
        <div className="centerAlign">
          <div className="wp-block-button">
            <a 
              className="wp-block-button__link" 
              href="https://www.fresha.com/book-now/spa-alita-v6pl5cct/services?lid=1090026&pId=1033567"
            >
              <strong>BOOK NOW!</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;