import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: 1,
      name: "Facial Treatments",
      description: "Professional facial treatments to rejuvenate and restore your skin's natural beauty",
      image: "/api/placeholder/400/300",
      link: "/services/facials",
      features: ["Deep Cleansing", "Anti-Aging", "Acne Treatment", "Hydration"]
    },
    {
      id: 2,
      name: "Massage Therapy",
      description: "Relaxing massage treatments to relieve stress and restore balance to your body",
      image: "/api/placeholder/400/300",
      link: "/services/massage",
      features: ["Deep Tissue", "Swedish", "Hot Stone", "Aromatherapy"]
    },
    {
      id: 3,
      name: "Body Treatments",
      description: "Luxurious body treatments for complete relaxation and skin rejuvenation",
      image: "/api/placeholder/400/300",
      link: "/services/body-treatments",
      features: ["Body Wraps", "Exfoliation", "Moisturizing", "Detox"]
    },
    {
      id: 4,
      name: "Nail Services",
      description: "Professional manicure and pedicure services for beautiful, healthy nails",
      image: "/api/placeholder/400/300",
      link: "/services/nails",
      features: ["Manicure", "Pedicure", "Gel Polish", "Nail Art"]
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <div className="services-hero">
        <div className="hero-content">
          <h1>Our Services</h1>
          <p>Discover our comprehensive range of spa and wellness services designed to rejuvenate your body, mind, and spirit</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-content">
        <div className="container">
          <div className="section-header">
            <h2>Choose Your Perfect Treatment</h2>
            <p>Each service is carefully designed to provide you with the ultimate relaxation and wellness experience</p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-image">
                  <img src={service.image} alt={service.name} />
                  <div className="service-overlay">
                    <Link to={service.link} className="explore-btn">
                      Explore Service
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  
                  <div className="service-features">
                    <h4>What's Included:</h4>
                    <ul>
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link to={service.link} className="learn-more-btn">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <h2>Ready to Book Your Treatment?</h2>
          <p>Contact us today to schedule your appointment and begin your wellness journey</p>
          <Link to="/book" className="cta-button">Book Now</Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;