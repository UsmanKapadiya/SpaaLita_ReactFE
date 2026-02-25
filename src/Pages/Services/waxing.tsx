//@ts-nocheck
import { useEffect, useState, type FC } from 'react';
import WaxingBanner from '../../assets/images/waxingBanner.jpg';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { WAXING_BOOK_NOW_URL } from '../../utils/constants';
import { getServicesByName } from '../../Services/SpaServices';

const Waxing: FC = () => {
    const [services, setServices] = useState<Service>();
    const [loading, setLoading] = useState<boolean>(true);
    let searchTerm = "waxing"

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
            bookNowUrl={services?.buttonUrl ? services?.buttonUrl : WAXING_BOOK_NOW_URL}
            title="WAXING"
            bannerImage={services?.serviceImage ? services?.serviceImage : WaxingBanner}
            bannerAlt="Waxing services at Spa A'lita"
            bannerWidth={436}
            bannerHeight={290}
            mockData={services}
            extraTopSpace={true}
        />
    );
};

export default Waxing;