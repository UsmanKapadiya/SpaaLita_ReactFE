import React from 'react';

const BookPage: React.FC = () => {
  return (
    <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
      <h1 style={{ color: '#667eea', marginBottom: '20px' }}>Book Your Appointment</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
        This page is under construction. Please call us at (555) 123-4567 to book your appointment.
      </p>
      <div style={{ marginTop: '40px', padding: '30px', background: '#f8f9fa', borderRadius: '10px', maxWidth: '500px', margin: '40px auto' }}>
        <h3 style={{ color: '#333', marginBottom: '15px' }}>Contact Information</h3>
        <p style={{ margin: '10px 0', color: '#666' }}>📞 Phone: (555) 123-4567</p>
        <p style={{ margin: '10px 0', color: '#666' }}>✉️ Email: info@spaalita.com</p>
        <p style={{ margin: '10px 0', color: '#666' }}>🕒 Hours: Mon-Sun 9AM-8PM</p>
      </div>
    </div>
  );
};

export default BookPage;