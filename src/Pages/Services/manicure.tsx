import type { FC } from 'react';
import ManicureBanner from '../../assets/images/manicureBanner.jpg';
import ManicureMockData from '../../mockData/manicureMockData';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { MANICURE_BOOK_NOW_URL } from '../../utils/constants';

const Manicure: FC = () => {
    return (
        <ServiceDetailTemplate
            bookNowUrl={MANICURE_BOOK_NOW_URL}
            title="MANICURES AND PEDICURES"
            bannerImage={ManicureBanner}
            bannerAlt="Manicure and pedicure services at Spa A'lita"
            bannerWidth={481}
            bannerHeight={289}
            mockData={ManicureMockData}
            extraTopSpace={true}
        />
    );
};

export default Manicure;