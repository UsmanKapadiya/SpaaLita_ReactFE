// @ts-nocheck
import React from 'react';
import LaserBanner from '../../assets/images/Laser-HairBanner.jpg';
import LaserMockData from '../../mockData/laserMockData';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import './globalServices.css';

const Laser: React.FC = () => {
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
                                src={LaserBanner}
                                alt="Massage Services"
                                className="wp-image-104 massage-banner"
                                style={{ width: 447, height: 298 }}
                            />
                        </figure>
                    </div>
                    <h1 className="wp-block-heading text-center my-5" id="massage">Laser Hair Removal</h1>

                    <div className="page-description my-4">
                        {LaserMockData?.pageContent?.description && (
                            <div
                                dangerouslySetInnerHTML={{ __html: LaserMockData?.pageContent?.description }}
                                className="spa-description"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Laser;