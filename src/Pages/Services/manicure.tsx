// @ts-nocheck
import React from 'react';
import ManicureBanner from '../../assets/images/manicureBanner.jpg';
import ManicureMockData from '../../mockData/manicureMockData';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import './globalServices.css';

const Manicure: React.FC = () => {
     return (
        <div className="massage-page">
            {/* Services Section */}
            <div className="massage-services">
                <div className="container">
                    <p></p>
                    <BookNowButton />
                    <div>
                        <figure
                            className="wp-block-image size-large is-resized is-style-rounded text-center mt-5">
                            <img
                                decoding="async"
                                width="800"
                                height="800"
                                src={ManicureBanner}
                                alt="Massage Services"
                                className="wp-image-104 massage-banner"
                                style={{ width: 481, height: 289 }}
                            />
                        </figure>
                    </div>
                    <h1 className="wp-block-heading text-center my-5" id="massage">Manicures and Pedicures</h1>

                    <div className="page-description my-4">
                        {ManicureMockData?.pageContent?.description && (
                            <div                
                                dangerouslySetInnerHTML={{ __html: ManicureMockData?.pageContent?.description }} 
                                className="spa-description"                    
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manicure;