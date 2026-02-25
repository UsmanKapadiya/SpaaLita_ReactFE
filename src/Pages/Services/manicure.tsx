//@ts-nocheck
import { useEffect, useState, type FC } from 'react';
import ManicureBanner from '../../assets/images/manicureBanner.jpg';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { MANICURE_BOOK_NOW_URL } from '../../utils/constants';
import { getServicesByName } from '../../Services/SpaServices';

const Manicure: FC = () => {
    const [services, setServices] = useState<Service>();
    const [loading, setLoading] = useState<boolean>(true);
    let searchTerm = "manicures-and-pedicures"

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
            bookNowUrl={services?.buttonUrl ? services?.buttonUrl : MANICURE_BOOK_NOW_URL}
            title="MANICURES AND PEDICURES"
            bannerImage={services?.serviceImage ? services?.serviceImage : ManicureBanner}
            bannerAlt="Manicure and pedicure services at Spa A'lita"
            bannerWidth={481}
            bannerHeight={289}
            mockData={services}
            extraTopSpace={true}
        />
    );
};

export default Manicure;