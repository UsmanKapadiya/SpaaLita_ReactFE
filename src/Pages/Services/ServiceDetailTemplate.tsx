// @ts-nocheck
import React from 'react';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import './GlobalServices.css';


const ServiceDetailTemplate = ({
    bookNowUrl,
    title,
    bannerImage,
    bannerAlt,
    bannerWidth = 400,
    bannerHeight = 400,
    mockData,
    extraTopSpace= false
}) => {
    return (
        <div className="service-detail-page">
            <div className="service-detail-content">
                <div className="container">
                    {extraTopSpace && (
                    <p></p>
                    )}
                    <BookNowButton  url={bookNowUrl}/>

                    <div className="service-banner-container">
                        <figure className="wp-block-image size-large is-resized is-style-rounded text-center mt-5">
                            <img
                                decoding="async"
                                width="800"
                                height="800"
                                src={bannerImage}
                                alt={bannerAlt}
                                className="wp-image-104 service-banner"
                                style={{ width: bannerWidth, height: bannerHeight }}
                            />
                        </figure>
                    </div>

                    <h1 className="wp-block-heading text-center my-5">{title}</h1>

                    <div className="page-description my-4">
                        {mockData?.pageContent?.description && (
                            <div
                                dangerouslySetInnerHTML={{ __html: mockData.pageContent.description }}
                                className="spa-description"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailTemplate;
