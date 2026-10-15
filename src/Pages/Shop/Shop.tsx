import type { FC } from 'react';
import ProductCatalog from '../../Component/ProductCatalog/ProductCatalog';
import { getAllProducts } from '../../Services/ProductRelatedServices';
import ImageNotFound from '../../assets/images/productImageNotFound.png';
import './Shop.css';

const Shop: FC = () => (
    <ProductCatalog
        source="shop"
        fetchItems={getAllProducts}
        itemPerPage={15}
        fallbackImage={ImageNotFound}
    />
);

export default Shop;
