import { useState } from 'react';

const ContactSection = ({ topPadding, normalFont }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        // Form submitted successfully
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className={`text-center ${topPadding}`}>
                        <h1 className="text-uppercase">Contact US</h1>
                        <h6 className="mt-4">101-745 Goldstream Ave,Victoria,BC,V9B 2X4</h6>
                        <h5 className="my-4">spaalitaoffice@shaw.ca</h5>
                        {normalFont ? (
                            <h6 className="">(250) 478-2252</h6>
                        ) : (
                            <h3 className="font-weight-bold">(250) 478-2252</h3>
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
                                    <button type="submit" className="black-button w-100">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default ContactSection;