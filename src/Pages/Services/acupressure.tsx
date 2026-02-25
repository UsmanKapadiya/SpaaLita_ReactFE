//@ts-nocheck
import { useEffect, useState, type FC } from 'react';
import AcuPressureBanner from '../../assets/images/accupressureBanner.jpg';
import AcuPressureMockData from '../../mockData/AcuPressureMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { ACUPRESSURE_BOOK_NOW_URL } from '../../utils/constants';
import { getServicesByName } from '../../Services/SpaServices';

const AcuPressure: FC = () => {
    const [services, setServices] = useState<Service>();
    const [loading, setLoading] = useState<boolean>(true);
    let searchTerm = "acupressure"

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
            bookNowUrl={services?.buttonUrl ? services?.buttonUrl : ACUPRESSURE_BOOK_NOW_URL}
            title="ACUPRESSURE"
            bannerImage={services?.serviceImage ? services?.serviceImage : AcuPressureBanner}
            bannerAlt="Acupressure treatment at Spa A'lita"
            bannerWidth={443}
            bannerHeight={296}
            mockData={services}
            extraTopSpace={true}
        />
    );
};

export default AcuPressure;