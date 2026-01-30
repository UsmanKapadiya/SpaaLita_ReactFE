import React from 'react';
import WaxingBanner from '../../assets/waxingBanner.jpg';
import WaxingMockData from '../../mockData/waxingMockData';
import './globalServices.css';

const Waxing: React.FC = () => {
    console.log("WaxingMockData", WaxingMockData)
    return (
        <div className="massage-page">
            {/* Services Section */}
            <div className="massage-services">
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