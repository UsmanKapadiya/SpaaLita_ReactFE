// @ts-nocheck
import FacialServices from '../../assets/images/facial_services.jpg';
import FacialsMockData from '../../mockData/facialsMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { FACIALS_BOOK_NOW_URL } from '../../utils/constants.js'

const Facials = () => {
    return (
        <ServiceDetailTemplate
            bookNowUrl={FACIALS_BOOK_NOW_URL}
            title="FACIALS"
            bannerImage={FacialServices}
            bannerAlt="Facial treatments at Spa A'lita"
            bannerWidth={400}
            bannerHeight={400}
            mockData={FacialsMockData}
            extraTopSpace={true}
        />
    );
};

export default Facials;
