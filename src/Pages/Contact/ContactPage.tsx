import ContactSection from '../../Component/ContactSection/ContactSection';
import { GOOGLE_MAPS_EMBED } from '../../utils/constants';
import './ContactPage.css';

const ContactPage = () => {

  return (
    <main>
      <section className="map-section">
        <div className="map-container">
          <iframe
            src={GOOGLE_MAPS_EMBED}
            // src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${address}&zoom=15`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Spa A'lita Location"
          />
        </div>
      </section>
      <section className="container my-5 pb-5">
        <ContactSection topPadding="pt-3" normalFont />
      </section>
    </main>
  );
};

export default ContactPage;