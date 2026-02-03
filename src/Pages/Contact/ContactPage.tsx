import React from 'react';
import ContactSection from '../../Component/ContactSection/ContactSection';

const ContactPage = () => {
  return (
    <>
      <div className="d-block my-3">
        <div className="w-100">
          <div className="map-container" style={{ height: '470px', width: '100%', overflow: 'hidden' }}>
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
      <div className='container my-5 pb-5'>
        <ContactSection topPadding={'pt-3'} normalFont={true} />
      </div>
    </>

  );
};

export default ContactPage;