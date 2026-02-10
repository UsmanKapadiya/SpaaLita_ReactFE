import type { FC } from 'react';
import AcuPressureBanner from '../../assets/images/accupressureBanner.jpg';
import AcuPressureMockData from '../../mockData/AcuPressureMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { ACUPRESSURE_BOOK_NOW_URL } from '../../utils/constants';

const AcuPressure: FC = () => {
    return (
        <ServiceDetailTemplate
            bookNowUrl={ACUPRESSURE_BOOK_NOW_URL}
            title="ACUPRESSURE"
            bannerImage={AcuPressureBanner}
            bannerAlt="Acupressure treatment at Spa A'lita"
            bannerWidth={443}
            bannerHeight={296}
            mockData={AcuPressureMockData}
            extraTopSpace={true}
        />
    );
};

export default AcuPressure;