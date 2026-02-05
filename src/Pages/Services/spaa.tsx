// @ts-nocheck
import React from 'react';
import SpaBanner from '../../assets/images/SpaaBanner.jpg';
import SpaaMockData from '../../mockData/SpaaMockData';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import './globalServices.css';

const Spaa: React.FC = () => {
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
                                src={SpaBanner}
                                alt="Massage Services"
                                className="wp-image-104 massage-banner"
                                style={{ width: 318, height: 318 }}
                            />
                        </figure>
                    </div>
                    <h1 className="wp-block-heading text-center my-5" id="massage">SPA PACKAGES</h1>

                    <div className="page-description my-4">
                        {SpaaMockData?.pageContent?.description && (
                            <div                
                                dangerouslySetInnerHTML={{ __html: SpaaMockData?.pageContent?.description }} 
                                className="spa-description"                    
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Spaa;