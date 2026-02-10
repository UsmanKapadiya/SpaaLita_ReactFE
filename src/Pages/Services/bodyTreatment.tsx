import type { FC } from 'react';
import BodyTreatmentBanner from '../../assets/images/bodyTreatmentBanner.jpg';
import BodyTreatmentMockData from '../../mockData/bodyTreatmentMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { BODYTREATMENT_BOOK_NOW_URL } from '../../utils/constants';

const BodyTreatment: FC = () => {
    return (
        <ServiceDetailTemplate
            bookNowUrl={BODYTREATMENT_BOOK_NOW_URL}
            title="BODY TREATMENTS"
            bannerImage={BodyTreatmentBanner}
            bannerAlt="Body treatments at Spa A'lita"
            bannerWidth={485}
            bannerHeight={323}
            mockData={BodyTreatmentMockData}
            extraTopSpace={true}
        />
    );
};

export default BodyTreatment;