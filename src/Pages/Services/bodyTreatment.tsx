//@ts-nocheck
import { useEffect, useState, type FC } from 'react';
import BodyTreatmentBanner from '../../assets/images/bodyTreatmentBanner.jpg';
import BodyTreatmentMockData from '../../mockData/bodyTreatmentMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { BODYTREATMENT_BOOK_NOW_URL } from '../../utils/constants';
import { getServicesByName } from '../../Services/SpaServices';


const BodyTreatment: FC = () => {
    const [services, setServices] = useState<Service>();
    const [loading, setLoading] = useState<boolean>(true);
    let searchTerm = "body-treatments"

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
            bookNowUrl={services?.buttonUrl ? services?.buttonUrl : BODYTREATMENT_BOOK_NOW_URL}
            title="BODY TREATMENTS"
            bannerImage={services?.serviceImage ? services?.serviceImage : BodyTreatmentBanner}
            bannerAlt="Body treatments at Spa A'lita"
            bannerWidth={485}
            bannerHeight={323}
            mockData={services}
            extraTopSpace={true}
        />
    );
};

export default BodyTreatment;