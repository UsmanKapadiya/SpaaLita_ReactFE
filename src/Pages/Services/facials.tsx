//@ts-nocheck
import { useEffect, useState, type FC } from 'react';
import FacialServices from '../../assets/images/facial_services.jpg';
import FacialsMockData from '../../mockData/facialsMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { FACIALS_BOOK_NOW_URL } from '../../utils/constants';
import { getServicesByName } from '../../Services/SpaServices';

const Facials: FC = () => {
    const [services, setServices] = useState<Service>();
    const [loading, setLoading] = useState<boolean>(true);
    let searchTerm = "facials"

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServicesByName(searchTerm);
                if (response.success === true) {
                    const data = response.data;
                    if (data.length > 0) {
                        setServices(data[0]);
                    };
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <ServiceDetailTemplate
            bookNowUrl={services?.buttonUrl ? services?.buttonUrl : FACIALS_BOOK_NOW_URL}
            title="FACIALS"
            bannerImage={services?.serviceImage ? services?.serviceImage : FacialServices}
            bannerAlt="Facial treatments at Spa A'lita"
            bannerWidth={400}
            bannerHeight={400}
            mockData={services}
            extraTopSpace={true}
        />
    );
};

export default Facials;
