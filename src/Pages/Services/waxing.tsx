// @ts-nocheck
import WaxingBanner from '../../assets/images/waxingBanner.jpg';
import WaxingMockData from '../../mockData/waxingMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { WAXING_BOOK_NOW_URL } from '../../utils/constants.js';

const Waxing = () => {
    return (
        <ServiceDetailTemplate
            bookNowUrl={WAXING_BOOK_NOW_URL}
            title="WAXING"
            bannerImage={WaxingBanner}
            bannerAlt="Waxing services at Spa A'lita"
            bannerWidth={436}
            bannerHeight={290}
            mockData={WaxingMockData}
            extraTopSpace={true}
        />
    );
};

export default Waxing;