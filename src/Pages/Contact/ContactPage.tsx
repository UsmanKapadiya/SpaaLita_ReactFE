import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
      <h1 style={{ color: '#667eea', marginBottom: '20px' }}>Contact Us</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto 40px' }}>
        Get in touch with us for any questions, appointments, or special requests.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ padding: '30px', background: '#f8f9fa', borderRadius: '15px' }}>
          <h3 style={{ color: '#333', marginBottom: '20px' }}>Visit Us</h3>
          <p style={{ margin: '10px 0', color: '#666' }}>📍 123 Spa Street</p>
          <p style={{ margin: '10px 0', color: '#666' }}>City, State 12345</p>
          <p style={{ margin: '10px 0', color: '#666' }}>🅿️ Free parking available</p>
        </div>
        
        <div style={{ padding: '30px', background: '#f8f9fa', borderRadius: '15px' }}>
          <h3 style={{ color: '#333', marginBottom: '20px' }}>Contact Info</h3>
          <p style={{ margin: '10px 0', color: '#666' }}>📞 (555) 123-4567</p>
          <p style={{ margin: '10px 0', color: '#666' }}>✉️ info@spaalita.com</p>
          <p style={{ margin: '10px 0', color: '#666' }}>🌐 www.spaalita.com</p>
        </div>
        
        <div style={{ padding: '30px', background: '#f8f9fa', borderRadius: '15px' }}>
          <h3 style={{ color: '#333', marginBottom: '20px' }}>Hours</h3>
          <p style={{ margin: '10px 0', color: '#666' }}>Monday - Friday: 9AM - 8PM</p>
          <p style={{ margin: '10px 0', color: '#666' }}>Saturday: 8AM - 9PM</p>
          <p style={{ margin: '10px 0', color: '#666' }}>Sunday: 10AM - 6PM</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;