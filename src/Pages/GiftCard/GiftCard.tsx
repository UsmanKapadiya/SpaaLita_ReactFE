import type { FC } from 'react';
import ProductCatalog from '../../Component/ProductCatalog/ProductCatalog';
import { getAllGiftCard } from '../../Services/ProductRelatedServices';

const GIFT_CARD_PLACEHOLDER = 'https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-1-180x180.jpg';

const GiftCard: FC = () => (
    <ProductCatalog
        source="giftCard"
        fetchItems={getAllGiftCard}
        itemPerPage={5}
        fallbackImage={GIFT_CARD_PLACEHOLDER}
    />
);

export default GiftCard;
