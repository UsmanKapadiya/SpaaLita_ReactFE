// @ts-nocheck
import MassageBanner from '../../assets/images/massage_banner.jpg';
import MassageMockData from '../../mockData/massageMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { MASSAGE_BOOK_NOW_URL } from '../../utils/constants.js'

const Massage = () => {
    return (
        <ServiceDetailTemplate
            bookNowUrl={MASSAGE_BOOK_NOW_URL}
            title="MASSAGE"
            bannerImage={MassageBanner}
            bannerAlt="Massage therapy at Spa A'lita"
            bannerWidth={506}
            bannerHeight={284}
            mockData={MassageMockData}
            extraTopSpace={true}
        />
    );
};

export default Massage;