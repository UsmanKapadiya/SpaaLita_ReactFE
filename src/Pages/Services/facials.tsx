// @ts-nocheck
import React from 'react';
import FacialServices from '../../assets/images/facial_services.jpg';
import FacialsMockData from '../../mockData/facialsMockData'
import './globalServices.css';

const Facials: React.FC = () => {
    return (
        <div className="facials-page">
            {/* Services Section */}
            <div className="facials-services">
                <div className="container">
                    <p></p>
                    <div className="wp-block-buttons is-content-justification-center is-layout-flex wp-container-core-buttons-is-layout-16018d1d wp-block-buttons-is-layout-flex">
                        <div className="wp-block-button centerAlign mt-0 mb-0">
                            <a className="wp-block-button__link wp-element-button"
                                href="https://www.fresha.com/book-now/spa-alita-v6pl5cct/services?lid=1090026&amp;pId=1033567">
                                <strong>BOOK NOW!</strong>
                            </a>
                        </div>
                    </div>
                    <div>
                        <figure
                            className="wp-block-image size-large is-resized is-style-rounded text-center mt-5">
                            <img
                                decoding="async"
                                width="800"
                                height="800"
                                src={FacialServices}
                                alt="Facials "
                                className="wp-image-104 facials-banner"
                                style={{ width: 400, height: 400 }}
                            />
                        </figure>
                    </div>
                    <h1 className="wp-block-heading text-center my-5" id="facials">FACIALS</h1>

                    <div className="page-description  my-4">
                        {FacialsMockData?.pageContent?.description && (
                            <div                
                                dangerouslySetInnerHTML={{ __html: FacialsMockData?.pageContent?.description }} 
                                className="spa-description"                    
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Facials;
