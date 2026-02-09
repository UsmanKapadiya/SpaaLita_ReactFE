// @ts-nocheck
import LaserBanner from '../../assets/images/Laser-HairBanner.jpg';
import LaserMockData from '../../mockData/laserMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { LASER_BOOK_NOW_URL } from '../../utils/constants.js';

const Laser = () => {
    return (
        <ServiceDetailTemplate
            bookNowUrl={LASER_BOOK_NOW_URL}
            title="LASER HAIR REMOVAL"
            bannerImage={LaserBanner}
            bannerAlt="Laser hair removal at Spa A'lita"
            bannerWidth={447}
            bannerHeight={298}
            mockData={LaserMockData}
            extraTopSpace={true}
        />
    );
};

export default Laser;