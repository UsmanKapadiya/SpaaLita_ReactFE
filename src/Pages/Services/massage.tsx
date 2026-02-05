// @ts-nocheck
import React from 'react';
import MassageBanner from '../../assets/images/massage_banner.jpg';
import MassageMockData from '../../mockData/massageMockData';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import './globalServices.css';

const Massage: React.FC = () => {
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
                                src={MassageBanner}
                                alt="Massage Services"
                                className="wp-image-104 massage-banner"
                                style={{ width: 506, height: 284 }}
                            />
                        </figure>
                    </div>
                    <h1 className="wp-block-heading text-center my-5" id="massage">MASSAGE</h1>

                    <div className="page-description my-4">
                        {MassageMockData?.pageContent?.description && (
                            <div                
                                dangerouslySetInnerHTML={{ __html: MassageMockData?.pageContent?.description }} 
                                className="spa-description"                    
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Massage;