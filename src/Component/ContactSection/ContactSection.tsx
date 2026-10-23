import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { contactSubmit } from '../../Services/ContactServices';
import { CONTACT_INFO } from '../../utils/constants';

declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

interface ContactSectionProps {
    topPadding: string;
    normalFont: boolean;
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const RECAPTCHA_SCRIPT_ID = 'google-recaptcha-v3-script';
const RECAPTCHA_ACTION = 'contact_submit';

const EMPTY_FORM = {
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: ''
};

const ContactSection = ({ topPadding, normalFont }: ContactSectionProps) => {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [recaptchaError, setRecaptchaError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!RECAPTCHA_SITE_KEY) {
            setRecaptchaError('reCAPTCHA is not configured.');
            return;
        }

        const handleScriptError = () => {
            setRecaptchaError('Unable to load reCAPTCHA. Please try again later.');
        };

        if (!window.grecaptcha && !document.getElementById(RECAPTCHA_SCRIPT_ID)) {
            const script = document.createElement('script');
            script.id = RECAPTCHA_SCRIPT_ID;
            script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
            script.async = true;
            script.defer = true;
            script.addEventListener('error', handleScriptError);
            document.head.appendChild(script);
        }

        return () => {
            document.getElementById(RECAPTCHA_SCRIPT_ID)?.removeEventListener('error', handleScriptError);
        };
    }, []);

    const getRecaptchaToken = () =>
        new Promise<string>((resolve, reject) => {
            const grecaptcha = window.grecaptcha;
            if (!RECAPTCHA_SITE_KEY || !grecaptcha) {
                reject(new Error('reCAPTCHA is not ready'));
                return;
            }

            grecaptcha.ready(() => {
                try {
                    grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION }).then(resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);

        try {
            let token: string;
            try {
                token = await getRecaptchaToken();
                setRecaptchaError('');
            } catch {
                const message = 'reCAPTCHA verification failed. Please try again.';
                setRecaptchaError(message);
                toast.error(message);
                return;
            }

            const response = await contactSubmit({ ...formData, 'g-recaptcha-response': token });

            if (response?.success) {
                toast.success(response?.message);
                setFormData(EMPTY_FORM);
            } else {
                toast.error(response?.message || 'Something went wrong');
            }
        } catch (error: any) {
            const serverMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                'Error submitting contact form';

            toast.error(serverMessage);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div
                        className={`text-center ${topPadding}`}
                        style={{ fontFamily: 'Avenir-LT,Arial,Helvetica,sans-serif' }}
                    >
                        <h1 className="text-uppercase">Contact US</h1>
                        <h6 className="mt-4">{CONTACT_INFO.ADDRESS}</h6>
                        <h5 className="my-4">{CONTACT_INFO.EMAIL}</h5>
                        {normalFont ? (
                            <h6 className="">{CONTACT_INFO.PHONE}</h6>
                        ) : (
                            <h3 style={{fontWeight:480}}>{CONTACT_INFO.PHONE}</h3>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="contact-form-container">
                        <form onSubmit={handleSubmit} className="erf-form">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded-0"
                                            id="name"
                                            name="name"
                                            placeholder="Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            maxLength={50}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <input
                                            type="email"
                                            className="form-control rounded-0"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded-0"
                                            id="phone"
                                            name="phone"
                                            placeholder="Phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded-0"
                                            id="address"
                                            name="address"
                                            placeholder="Address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded-0"
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group mb-3">
                                        <textarea
                                            className="form-control rounded-0"
                                            id="message"
                                            name="message"
                                            rows={5}
                                            placeholder="Type your message here"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            maxLength={500}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    {recaptchaError && (
                                        <div className="text-danger mb-3" role="alert">
                                            {recaptchaError}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="black-button w-100" disabled={submitting}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
