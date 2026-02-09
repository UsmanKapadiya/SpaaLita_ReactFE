// @ts-nocheck
import BrowsBanner from '../../assets/images/browsBanner.jpg';
import BrowsMockData from '../../mockData/browsMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { BROW_BOOK_NOW_URL } from './ServicesConstants';

const Brows = () => {
    return (
        <ServiceDetailTemplate
            bookNowUrl={BROW_BOOK_NOW_URL}
            title="BROWS & LASHES"
            bannerImage={BrowsBanner}
            bannerAlt="Brow and lash services at Spa A'lita"
            bannerWidth={373}
            bannerHeight={373}
            mockData={BrowsMockData}
            extraTopSpace={true}
        />
    );
};

export default Brows;