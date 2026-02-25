//@ts-nocheck
import { useEffect, useState, type FC } from 'react';
import BrowsBanner from '../../assets/images/browsBanner.jpg';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { BROW_BOOK_NOW_URL } from '../../utils/constants';
import { getServicesByName } from '../../Services/SpaServices';

const Brows: FC = () => {
    const [services, setServices] = useState<Service>();
    const [loading, setLoading] = useState<boolean>(true);
    let searchTerm = "brows-and-lashes"

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
            bookNowUrl={services?.buttonUrl ? services?.buttonUrl : BROW_BOOK_NOW_URL}
            title="BROWS & LASHES"
            bannerImage={services?.serviceImage ? services?.serviceImage : BrowsBanner}
            bannerAlt="Brow and lash services at Spa A'lita"
            bannerWidth={373}
            bannerHeight={373}
            mockData={services}
            extraTopSpace={true}
        />
    );
};

export default Brows;