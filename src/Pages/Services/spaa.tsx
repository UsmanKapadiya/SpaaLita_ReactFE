//@ts-nocheck
import { useEffect, useState, type FC } from 'react';
import SpaBanner from '../../assets/images/SpaaBanner.jpg';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { SPAA_BOOK_NOW_URL } from '../../utils/constants';
import { getServicesByName } from '../../Services/SpaServices';


const Spaa: FC = () => {
    const [services, setServices] = useState<Service>();
    const [loading, setLoading] = useState<boolean>(true);
    let searchTerm = "spa-packages"

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
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
            bookNowUrl={services?.buttonUrl ? services?.buttonUrl : SPAA_BOOK_NOW_URL}
            title="SPA PACKAGES"
            bannerImage={services?.serviceImage ? services?.serviceImage : SpaBanner}
            bannerAlt="Spa packages at Spa A'lita"
            bannerWidth={318}
            bannerHeight={318}
            mockData={services}
            extraTopSpace={true}
        />
    );
};

export default Spaa;