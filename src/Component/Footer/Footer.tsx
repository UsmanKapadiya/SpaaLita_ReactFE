import type { FC, FormEvent } from 'react';
import { useCallback, useState } from 'react';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { toast } from 'react-toastify';
import { CONTACT_INFO } from '../../utils/constants';
import { subscribeNewsletter } from '../../Services/NewsletterServices';

const Footer: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleNewsletterSubmit = useCallback(async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    const res = await subscribeNewsletter(email.trim());

    setSubmitting(false);

    if (res?.success) {
      toast.success(res.message || 'Thank you for subscribing to our newsletter');
      setEmail('');
    } else {
      toast.error(res?.message || 'Failed to subscribe to the newsletter');
    }
  }, [email]);

  return (
    <div>
      <div className="newsletter-signup">
        <p className='mb-0'>Please sign up to receive updates and promotional offers</p>
        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address for newsletter"
            />
          </div>
          <div>
            <button type="submit" className="newsletter-btn" disabled={!email.trim() || submitting}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className='container'>
        <div className="row mb-5">
          <div className="col-lg-5 m-auto text-center">
            <h6 className="my-2">{CONTACT_INFO.EMAIL}</h6>
            <h6>{CONTACT_INFO.PHONE}</h6>
            <h6 className="mt-3">{CONTACT_INFO.ADDRESS}</h6>
            <h6>©2026 by Spa A'lita.</h6>
          </div>
        </div>
      </div>
      <div className='socialMediaDiv mb-5'>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="icon-circle">
          <InstagramIcon fontSize="medium" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="icon-circle">
          <FacebookIcon fontSize="medium" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
