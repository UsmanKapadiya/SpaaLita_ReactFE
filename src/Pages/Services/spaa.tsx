// @ts-nocheck
import SpaBanner from '../../assets/images/SpaaBanner.jpg';
import SpaaMockData from '../../mockData/SpaaMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { SPAA_BOOK_NOW_URL } from './ServicesConstants';

const Spaa = () => {
    return (
        <ServiceDetailTemplate
            bookNowUrl={SPAA_BOOK_NOW_URL}
            title="SPA PACKAGES"
            bannerImage={SpaBanner}
            bannerAlt="Spa packages at Spa A'lita"
            bannerWidth={318}
            bannerHeight={318}
            mockData={SpaaMockData}
            extraTopSpace={true}
        />
    );
};

export default Spaa;