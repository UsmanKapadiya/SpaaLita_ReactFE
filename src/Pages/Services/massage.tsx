//@ts-nocheck
import { useEffect, useState, type FC } from 'react';
import MassageBanner from '../../assets/images/massage_banner.jpg';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { MASSAGE_BOOK_NOW_URL } from '../../utils/constants'
import { getServicesByName } from '../../Services/SpaServices';

const Massage: FC = () => {
    const [services, setServices] = useState<Service>();
    const [loading, setLoading] = useState<boolean>(true);
    let searchTerm = "Massage"

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
            bookNowUrl={services?.buttonUrl ? services?.buttonUrl : MASSAGE_BOOK_NOW_URL}
            title="MASSAGE"
             bannerImage={services?.serviceImage ? services?.serviceImage : MassageBanner}
            bannerAlt="Massage therapy at Spa A'lita"
            bannerWidth={506}
            bannerHeight={284}
            mockData={services}
            extraTopSpace={true}
        />
    );
};

export default Massage;