import type { FC } from 'react';
import { useEffect, useState } from 'react';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import { getServicesByName } from '../../Services/SpaServices';
import type { ServiceDetail } from './ServicesConstants';
import './globalServices.css';

interface ServiceData {
    buttonUrl?: string;
    serviceDescription?: string;
    serviceImage?: string;
    serviceName?: string;
}

const decodeHtml = (html: string) =>
    html
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ');

const ServiceDetailPage: FC<{ service: ServiceDetail }> = ({ service }) => {
    const [details, setDetails] = useState<ServiceData>();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        const fetchService = async () => {
            try {
                const response = await getServicesByName(service.searchTerm);
                if (response.success === true && response.data.length > 0) {
                    setDetails(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchService();
    }, [service.searchTerm]);

    return (
        <div className="service-detail-page">
            <div className="service-detail-content">
                <div className="container">
                    <p></p>
                    <BookNowButton url={details?.buttonUrl || service.bookNowUrl} />

                    <div className="service-banner-container">
                        <figure className="wp-block-image size-large is-resized is-style-rounded text-center mt-5">
                            <img
                                decoding="async"
                                width="800"
                                height="800"
                                src={details?.serviceImage || service.bannerImage}
                                alt={service.bannerAlt}
                                className="wp-image-104 service-banner"
                                style={{ width: service.bannerWidth, height: service.bannerHeight }}
                            />
                        </figure>
                    </div>

                    <h1 className="wp-block-heading text-center my-5">{service.title}</h1>

                    <div className="page-description my-4">
                        {details?.serviceDescription && (
                            <div dangerouslySetInnerHTML={{ __html: decodeHtml(details.serviceDescription) }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;
