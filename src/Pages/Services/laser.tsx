//@ts-nocheck
import { useEffect, useState, type FC } from 'react';
import LaserBanner from '../../assets/images/Laser-HairBanner.jpg';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { LASER_BOOK_NOW_URL } from '../../utils/constants';
import { getServicesByName } from '../../Services/SpaServices';

const Laser: FC = () => {
    const [services, setServices] = useState<Service>();
    const [loading, setLoading] = useState<boolean>(true);
    let searchTerm = "laser-hair-removal"

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
            bookNowUrl={services?.buttonUrl ? services?.buttonUrl : LASER_BOOK_NOW_URL}
            title="LASER HAIR REMOVAL"
            bannerImage={services?.serviceImage ? services?.serviceImage : LaserBanner}
            bannerAlt="Laser hair removal at Spa A'lita"
            bannerWidth={447}
            bannerHeight={298}
            mockData={services}
            extraTopSpace={true}
        />
    );
};

export default Laser;