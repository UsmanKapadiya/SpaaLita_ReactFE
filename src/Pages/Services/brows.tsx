// @ts-nocheck
import React from 'react';
import BrowsBanner from '../../assets/images/browsBanner.jpg';
import BrowsMockData from '../../mockData/browsMockData';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import './globalServices.css';

const Brows: React.FC = () => {
    return (
       <div className="massage-page">
            {/* Services Section */}
            <div className="massage-services">
                <div className="container">
                    <p></p>
                    <BookNowButton />
                    <div>
                        <p></p>
                        <figure
                            className="wp-block-image size-large is-resized is-style-rounded text-center">
                            <img
                                decoding="async"
                                width="800"
                                height="800"
                                src={BrowsBanner}
                                alt="Massage Services"
                                className="wp-image-104 massage-banner"
                                style={{ width: 373, height: 373 }}
                            />
                        </figure>
                    </div>
                    <h1 className="wp-block-heading text-center my-5" id="massage">Brows & Lashes</h1>

                    <div className="page-description my-4">
                        {BrowsMockData?.pageContent?.description && (
                            <div                
                                dangerouslySetInnerHTML={{ __html: BrowsMockData?.pageContent?.description }} 
                                className="spa-description"                    
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brows;