// @ts-nocheck
import React from 'react';
import WaxingBanner from '../../assets/images/waxingBanner.jpg';
import WaxingMockData from '../../mockData/waxingMockData';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import './globalServices.css';

const Waxing: React.FC = () => {
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
                                src={WaxingBanner}
                                alt="Massage Services"
                                className="wp-image-104 massage-banner"
                                style={{ width: 436, height: 290 }}
                            />
                        </figure>
                    </div>
                    <h1 className="wp-block-heading text-center my-5" id="massage">WAXING</h1>

                    <div className="page-description my-4">
                        {WaxingMockData?.pageContent?.description && (
                            <div
                                dangerouslySetInnerHTML={{ __html: WaxingMockData?.pageContent?.description }}
                                className="spa-description"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Waxing;