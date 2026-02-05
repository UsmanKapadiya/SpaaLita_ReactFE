// @ts-nocheck
import React from 'react';
import BodyTreatmentBanner from '../../assets/images/bodyTreatmentBanner.jpg';
import BodyTreatmentMockData from '../../mockData/bodyTreatmentMockData';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import './globalServices.css';

const BodyTreatment: React.FC = () => {
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
                                src={BodyTreatmentBanner}
                                alt="Massage Services"
                                className="wp-image-104 massage-banner"
                                style={{ width: 485, height: 323 }}
                            />
                        </figure>
                    </div>
                    <h1 className="wp-block-heading text-center my-5" id="massage">BODY TREATMENTS</h1>

                    <div className="page-description my-4">
                        {BodyTreatmentMockData?.pageContent?.description && (
                            <div                
                                dangerouslySetInnerHTML={{ __html: BodyTreatmentMockData?.pageContent?.description }} 
                                className="spa-description"                    
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyTreatment;